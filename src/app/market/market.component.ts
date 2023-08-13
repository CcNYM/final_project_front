import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss']
})
export class MarketComponent {

  constructor(private router: Router) {}

  stocks = [
    { stockId: 1, stockName: 'ABC', currentPrice: 100, priceFluctuation: 5, fluctuationRate: 0.05 },
    { stockId: 2, stockName: 'XYZ', currentPrice: 200, priceFluctuation: -10, fluctuationRate: -0.1 },
    { stockId: 3, stockName: 'DEF', currentPrice: 150, priceFluctuation: 0, fluctuationRate: 0 }
  ];

  showMarket() {
    // 处理显示市场的逻辑
    this.router.navigate(['/market']);
  }

  showPortfolio() {
    // 处理显示投资组合的逻辑
    this.router.navigate(['/portfolio']);
  }
}
