import { Component } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';
import {Card} from './card';
import {CardService} from './card.service';

@Component({
  selector: 'app-spec-data',
  templateUrl: './spec-data.component.html',
  styleUrls: ['./spec-data.component.scss']
})
export class SpecDataComponent {
  dataSource: MyDataSource;
  constructor(private cardService: CardService) {
    this.dataSource = new MyDataSource(this.cardService);
  }
  observableData = new BehaviorSubject<number[]>([]);

  emitData() {
    const items = Array(3).fill(0).map(() => Math.round(Math.random() * 100));
    const data = this.observableData.value.concat(items);
    this.observableData.next(data);
  }
}

export class MyDataSource extends DataSource<Card | undefined> {
  private PAGE_SIZE = 10;
  private fetchedPages = new Set<number>();

  private cachedData = Array.from<Card>({ length: 200 });
  private dataStream = new BehaviorSubject<(Card | undefined)[]>(this.cachedData);

  private subscription = new Subscription();

  constructor(private cardService: CardService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<(Card | undefined)[]> {
    this.subscription.add(collectionViewer.viewChange.subscribe(range => {
      const startPage = this.getPageForIndex(range.start);
      const endPage = this.getPageForIndex(range.end);
      console.log('start page = ' + startPage + ', end page = ' + endPage);
      for (let i = startPage; i <= endPage; i++) {
        this.fetchPage(i);
      }
    }));

    return this.dataStream;
  }

  disconnect(): void {
    this.subscription.unsubscribe();
  }

  private getPageForIndex(index: number): number {
    return Math.floor(index / this.PAGE_SIZE);
  }

  private fetchPage(page: number) {
    this.cardService.getCards(page).subscribe(cards => {
      this.cachedData.concat(cards);
      this.dataStream.next(this.cachedData);
    });
  }
}
