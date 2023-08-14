import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SingleStockDetail } from './domain/SingleStockDetail';
import { PriceTrend } from './domain/PriceTrend';

@Injectable({
  providedIn: 'root'
})
export class StockdetailApiService {

  private apiUrl = "localhost:8080/stock-detail";

  constructor(private http: HttpClient) { }

  getSingleStockDetatil(): Observable<SingleStockDetail>{
    return this.http.get<SingleStockDetail>(`${this.apiUrl}/getSingleStockDetail/{stockId}`);
  }

  getWeelyTrendDetail(): Observable<PriceTrend>{
    return this.http.get<PriceTrend>(`${this.apiUrl}/getWeeklyTrendDetails/{stockId}`);
  }
}
