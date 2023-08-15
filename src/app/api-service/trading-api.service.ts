import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";

import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { TransactionRes } from "../domain/trainsactionRes";

@Injectable({
  providedIn: 'root'
})
export class TradingApiService {
  constructor(private http: HttpClient) {
  }

  

  startTrading(trainsactionList:any):Observable<TransactionRes>{
    return this.http.post<TransactionRes>("http://localhost:8080/stockTrading/trading",trainsactionList)
  }

  // sellAll(){
  //   return this.http.get<TransactionRes>("http://localhost:8080/stockTrading/trading",trainsactionList)
  // }

  sellAll(): Observable<TransactionRes> {
    return this.http.get<TransactionRes>("http://localhost:8080/stockTrading/sellAll")
      .pipe(
        retry(3),
        catchError(this.handleError),
      );
  }
  
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError(() => new Error('Please try again later.'));
  }

  // getShipper(id: number) {
  //   return this.http.get<Shipper>(`/api/shippers/${id}`)
  //     .pipe(
  //       retry(3),
  //       catchError(this.handleError),
  //     );
  // }

  // deleteShipper(id: number) {
  //   return this.http.delete<void>(`/api/shippers/${id}`);
  // }

  // // TODO allow nulls for phone
  // addShipper(name: string, phone: string | null) {
  //   return this.http.post("/api/shippers", { name, phone });
  // }

  // updateShipper(id: string, name: string, phone: string) {
  //   return this.http.put(`/api/shippers/${id}`, { name, phone });
  // }

  // private handleError(error: HttpErrorResponse) {
  //   console.error("An error occurred:", error.error);
  //   return throwError(() => new Error("Please try again later."));
  // }
}