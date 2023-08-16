import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class PortfolioComponent implements OnInit, OnDestroy {

  principle: number = 0;
  stocks: Portfolio[] = [];
  public shouldShowSellButton: boolean = false;

  timer: any;

  constructor(
    private router: Router,
    private userService: UserApiService,
    private dialog: MatDialog
  ) { }


  async ngOnInit() {
    await this.loadPrinciple(1);
    await this.loadPortfolio(1);
    if (this.stocks.length != 0) {
      this.shouldShowSellButton = true
    }
    this.timer = setInterval(() => {
      this.loadPrinciple(1);
      this.loadPortfolio(1);
      console.log("+10s")
    }, 10000)
    //console.log(this.shouldShowSellButton)
  }

  ngOnDestroy(): void {
    clearInterval(this.timer);
  }

  async loadPrinciple(userId: number) {
    return new Promise((resolve, reject) => {
      this.userService.getUserPrincipleHoldings(userId).subscribe({
        next: async (principle: number) => {
          this.principle = principle
          resolve(reject)
        },
        error: async (error) => {
          console.error('Error occured' + error)
          reject()
        }
      })
    })
  }

  async loadPortfolio(userId: number) {
    return new Promise((resolve, reject) => {
      this.userService.getPortfolioList(userId).subscribe({
        next: async (stocks: Portfolio[]) => {
          this.stocks = stocks
          resolve(reject)
        },
        error: async (error) => {
          console.error('Error occured' + error)
          reject()
        }
      })
    })
  }

  // async loadPortfolio(userId: number){
  //   this.userService.getPortfolioList(userId).subscribe({
  //     next: (stocks: Portfolio[]) => (this.stocks = stocks),
  //     error: (error) => console.error('Error occured' + error),
  //   })
  // }

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
