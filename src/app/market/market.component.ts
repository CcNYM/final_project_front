import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '../api-service/user-api.service';
import { RealTimeStockApiService } from '../api-service/real-time-stock-api.service';
import { Market } from '../domain/market';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit, OnDestroy{
  principle: number = 0;
  stocks: Market[] = [];
  stocksTemp: Market[] = [];
  searchKeyword: any;

  timer: any;


  constructor(
    private router: Router, 
    private userService: UserApiService, 
    private realTimeStockService: RealTimeStockApiService
    ) {}

  ngOnInit(): void {
      this.loadPrinciple(1);
      this.loadMarket();
      this.timer = setInterval(() => {
        this.loadMarket();
        console.log("+10s")
      },10000)
  }

  ngOnDestroy(): void {
      clearInterval(this.timer);
  }

  loadPrinciple(userId: number): void{
    this.userService.getUserPrincipleHoldings(userId).subscribe({
      next: (principle: number) => (this.principle = principle),
      error: (error) => console.error('Error occured' + error),
    })
  }

  loadMarket(): void{
    this.realTimeStockService.getMarketList().subscribe({
      next: (stocks: Market[]) => {
        this.stocks = stocks ,
        this.stocksTemp = stocks
      },
      error: (error) => console.error('Error occured' + error),
    })
  }

  searchByStockName() { 

    let successFlag = false

    for(let index=0 ; index < this.stocksTemp.length; index++) {
        if (this.stocksTemp[index].stockName == this.searchKeyword)
        {
          this.stocks = [this.stocksTemp[index]]
          successFlag = true
          break;
        }
    }
    if (successFlag == false && this.searchKeyword==null) {
      alert("please input value!")
    }
    if (successFlag == false && this.searchKeyword!=null) {
      alert("can't get the stock!")
    }
   
  }
  searchByStockId() {

    let successFlag = false

    for(let index=0 ; index < this.stocksTemp.length; index++) {
        if (this.stocksTemp[index].stockId == this.searchKeyword)
        {
          this.stocks = [this.stocksTemp[index]]
          successFlag = true
          break;
        }
    }
    if (successFlag == false && this.searchKeyword==null) {
      alert("please input value!")
    }
    if (successFlag == false && this.searchKeyword!=null) {
      alert("can't get the stock!")
    }
    

  }

  // stocks = [
  //   { stockId: 1, stockName: 'ABC', currentPrice: 100, priceFluctuation: 5, fluctuationRate: 0.05 },
  //   { stockId: 2, stockName: 'XYZ', currentPrice: 200, priceFluctuation: -10, fluctuationRate: -0.1 },
  //   { stockId: 3, stockName: 'DEF', currentPrice: 150, priceFluctuation: 0, fluctuationRate: 0 }
  // ];

  showMarket() {
    // 处理显示市场的逻辑
    this.router.navigate(['/market']).then(() => {
      window.location.reload();
    });
  }

  showPortfolio() {
    // 处理显示投资组合的逻辑
    this.router.navigate(['/portfolio']).then(() => {
        window.location.reload();
      });
  }

  sortPriceFlag=1
  sortRateFlag=1
  sortPriceName = "asc"
  sortRateName = "asc"

  sortPrice() {
    if (this.sortPriceFlag == 1) {
      this.sortPriceName = "des"
      this.sortPriceAscending()
      this.sortPriceFlag = 2
    }
    else if (this.sortPriceFlag == 2) {
      this.sortPriceName = "asc"
      this.sortPriceDescending()
      this.sortPriceFlag = 1
    }
  }

  sortRate() {
    if (this.sortRateFlag == 1) {
      this.sortRateName = "des"
      this.sortRateAscending()
      this.sortRateFlag = 2
    }
    else if (this.sortRateFlag == 2) {
      this.sortRateName = "asc"
      this.sortRateDescending()
      this.sortRateFlag = 1
    }
  }
 

  // sortRate
  sortPriceAscending() {
    // 执行升序排序逻辑
    this.stocks.sort((a,b)=>a.currentPrice-b.currentPrice)
  }

  sortPriceDescending() {
    // 执行降序排序逻辑
    this.stocks.sort((a,b)=>b.currentPrice-a.currentPrice)
  }

  sortRateAscending() {
    // 执行升序排序逻辑
    this.stocks.sort((a,b)=>a.fluctuationRate-b.fluctuationRate)
  }

  sortRateDescending() {
    // 执行降序排序逻辑
    this.stocks.sort((a,b)=>b.fluctuationRate-a.fluctuationRate)
  }

}


