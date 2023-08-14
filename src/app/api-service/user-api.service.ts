import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Portfolio } from '../domain/portfolio';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  constructor(private http: HttpClient) { }

  getUserPrincipleHoldings(userId: number){
    return this.http
    .get<number>(`http://localhost:8080/user/getUserPrincipleHoldings/${userId}`)
    .pipe(retry(3), catchError(this.handleError));
  }

  getPortfolioList(userId: number){
    return this.http
    .get<Portfolio[]>(`http://localhost:8080/user/getPortfolioList/${userId}`)
    .pipe(retry(3), catchError(this.handleError));
  }
  
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.error);
    return throwError(() => new Error('Please try again later.'));
  }
}
