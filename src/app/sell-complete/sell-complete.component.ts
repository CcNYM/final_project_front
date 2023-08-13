import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SellServiceService } from './sell-service.service';

@Component({
  selector: 'app-sell-complete',
  templateUrl: './sell-complete.component.html',
  styleUrls: ['./sell-complete.component.scss']
})
export class SellCompleteComponent {

  sellData:any;

  constructor(private router: Router, private sellService: SellServiceService) {
    this.sellData = this.sellService.sellData;
    console.log(this.sellData);
  }

  res = { totalValue: 1200, benefits: 100, principal:5000}


  

  continue() {
    // 处理显示市场的逻辑
    this.router.navigate(['/market']);
  }
}
