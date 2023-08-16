import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { SingleStockDetail } from '../domain/singleStockDetail';
import { PriceTrend } from '../domain/priceTrend';

@Injectable({
  providedIn: 'root'
})
export class StockdetailApiService {


  constructor(private http: HttpClient) { }

  getSingleStockDetatil(userId: number, stockId: number) {
    return this.http
    .get<SingleStockDetail>(`http://localhost:8080/stock-detail/getSingleStockDetail/${stockId}`)
    .pipe(retry(3),catchError(this.handleError));
  }

  getWeelyTrendDetail(stockId: number){
    return this.http
    .get<number[]>(`http://localhost:8080/stock-detail/getWeeklyTrendDetails/${stockId}`)
    .pipe(retry(3),catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError(() => new Error('Please try again later.'));
  }
}
