import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Card} from './card';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private cardServiceUrl = 'http://localhost:3000/cards';
  
  constructor(private httpClient: HttpClient) { }

  getCards(pageNumber: number): Observable<Card[]> {
    const url = `${this.cardServiceUrl}?page=${pageNumber}`;
    return this.httpClient.get<Card[]>(url);
  }
}
