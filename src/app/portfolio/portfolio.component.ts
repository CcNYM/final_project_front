import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Portfolio } from '../domain/portfolio';
import { UserApiService } from '../api-service/user-api.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit{

  principle: number = 0;
  stocks: Portfolio[] = [];

  constructor(
    private router: Router,
    private userService: UserApiService,
    private dialog: MatDialog
    ) {}

  
  ngOnInit(): void{
      this.loadPrinciple(1);
      this.loadPortfolio(1);
  }

  loadPrinciple(userId: number): void{
    this.userService.getUserPrincipleHoldings(userId).subscribe({
      next: (principle: number) => (this.principle = principle),
      error: (error) => console.error('Error occured' + error),
    })
  }

  loadPortfolio(userId: number): void{
    this.userService.getPortfolioList(userId).subscribe({
      next: (stocks: Portfolio[]) => (this.stocks = stocks),
      error: (error) => console.error('Error occured' + error),
    })
  }

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
