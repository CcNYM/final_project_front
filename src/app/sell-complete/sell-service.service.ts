import { Injectable } from '@angular/core';
import { TransactionRes } from '../domain/trainsactionRes';

@Injectable({
  providedIn: 'root'
})
export class SellServiceService {

  sellData: any;
  trainsactionRes: any;

  constructor() { }
}
