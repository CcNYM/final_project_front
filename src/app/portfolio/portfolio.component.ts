import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent {

  constructor(private router: Router,private dialog: MatDialog) {}

  stocks = [
    { stockId: 1, stockName: 'ABC', currentPrice: 100, rateOfReturn: 0.3, profits: 26 },
    { stockId: 2, stockName: 'XYZ', currentPrice: 200, rateOfReturn: -0.1, profits: -7 },
    { stockId: 3, stockName: 'DEF', currentPrice: 150, rateOfReturn: 0, profits: 0 }
  ];

  showMarket() {
    // 处理显示市场的逻辑
    this.router.navigate(['/market']);
  }

  showPortfolio() {
    // 处理显示投资组合的逻辑
    this.router.navigate(['/portfolio']);
  }

  openConfirmationDialog(): void {
    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.panelClass = 'confirmation-dialog-container';
    dialogConfig.data = { message: 'Do you confirm the sale?' };
    dialogConfig.position = { top: '20%' };
  
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // 用户确认销售
        // 执行跳转到新页面的操作
      } else {
        // 用户取消销售
        // 可以选择不执行任何操作或者添加其他关闭提示窗口的逻辑
      }
    });
  }
}
