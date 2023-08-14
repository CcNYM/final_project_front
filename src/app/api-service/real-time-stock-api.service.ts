import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Market } from '../domain/market';

@Injectable({
  providedIn: 'root'
})
export class RealTimeStockApiService {

  constructor(private http: HttpClient) { }

  getMarketList(){
    return this.http
    .get<Market[]>(`http://localhost:8080/realTimeStock/getMarketList`)
    .pipe(retry(3), catchError(this.handleError));
  }
  
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError(() => new Error('Please try again later.'));
  }
}
