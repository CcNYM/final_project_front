import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserApiService } from '../api-service/user-api.service';
import { RealTimeStockApiService } from '../api-service/real-time-stock-api.service';
import { Market } from '../domain/market';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent implements OnInit{
  principle: number = 0;
  stocks: Market[] = [];
  backgroundImageUrl = '../../assets/background.jpg'; // 替换为你的背景图路径
  opacityValue = 0; // 替换为你的透明度值

  constructor(
    private router: Router, 
    private userService: UserApiService, 
    private realTimeStockService: RealTimeStockApiService
    ) {}

  ngOnInit(): void {
      this.loadPrinciple(1);
      this.loadMarket();
  }

  loadPrinciple(userId: number): void{
    this.userService.getUserPrincipleHoldings(userId).subscribe({
      next: (principle: number) => (this.principle = principle),
      error: (error) => console.error('Error occured' + error),
    })
  }

  loadMarket(): void{
    this.realTimeStockService.getMarketList().subscribe({
      next: (stocks: Market[]) => (this.stocks = stocks),
      error: (error) => console.error('Error occured' + error),
    })
  }



  // stocks = [
  //   { stockId: 1, stockName: 'ABC', currentPrice: 100, priceFluctuation: 5, fluctuationRate: 0.05 },
  //   { stockId: 2, stockName: 'XYZ', currentPrice: 200, priceFluctuation: -10, fluctuationRate: -0.1 },
  //   { stockId: 3, stockName: 'DEF', currentPrice: 150, priceFluctuation: 0, fluctuationRate: 0 }
  // ];

  showMarket() {
    // 处理显示市场的逻辑
    this.router.navigate(['/market']);
  }

  showPortfolio() {
    // 处理显示投资组合的逻辑
    this.router.navigate(['/portfolio']);
  }
}
