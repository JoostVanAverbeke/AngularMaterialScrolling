import { Component } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { DataSource, CollectionViewer } from '@angular/cdk/collections';

@Component({
  selector: 'app-spec-data',
  templateUrl: './spec-data.component.html',
  styleUrls: ['./spec-data.component.scss']
})
export class SpecDataComponent {
  dataSource = new MyDataSource();

  observableData = new BehaviorSubject<number[]>([]);

  emitData() {
    const items = Array(3).fill(0).map(() => Math.round(Math.random() * 100));
    const data = this.observableData.value.concat(items);
    this.observableData.next(data);
  }
}

export class MyDataSource extends DataSource<string | undefined> {
  private PAGE_SIZE = 10;
  private fetchedPages = new Set<number>();

  private cachedData = Array.from<string>({ length: 1000 });
  private dataStream = new BehaviorSubject<(string | undefined)[]>(this.cachedData);

  private subscription = new Subscription();

  connect(collectionViewer: CollectionViewer): Observable<(string | undefined)[]> {
    this.subscription.add(collectionViewer.viewChange.subscribe(range => {
      const startPage = this.getPageForIndex(range.start);
      const endPage = this.getPageForIndex(range.end);
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
    if (this.fetchedPages.has(page)) {
      return;
    }
    this.fetchedPages.add(page);

    // simulate fetching data from server
    setTimeout(() => {
      this.cachedData.splice(page * this.PAGE_SIZE, this.PAGE_SIZE,
        ...Array.from({ length: this.PAGE_SIZE })
          .map((_, i) => `Item #${page * this.PAGE_SIZE + i}`));

      this.dataStream.next(this.cachedData);
    }, 2000);
  }
}
