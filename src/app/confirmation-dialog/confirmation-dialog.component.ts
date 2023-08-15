import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TransactionRes } from '../domain/trainsactionRes';
import { TradingApiService } from '../api-service/trading-api.service';
import { SellServiceService } from '../sell-complete/sell-service.service';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    private router: Router,
    private tradingApiService: TradingApiService,
    private sellService: SellServiceService
  ) { }

  transactionRes:TransactionRes = {totalValue:0,benefit:0,principal:0,status:'test'}

  async stockTransaction() {
    return new Promise((resolve, reject) => {
      this.tradingApiService.sellAll().subscribe({
        next : async (transactionRes: TransactionRes) => {
          this.transactionRes = transactionRes
          console.log('first the trainsactionRes is ')
          console.log(this.transactionRes)      
          resolve(reject);
        },
        error: async (error) => {
          console.error('Error occurred ' + error)
          reject();
        },
      });
    });
  }

  async confirm() {

    await this.stockTransaction()
    // 保存传递的值到 SellService 服务的属性中
    this.sellService.trainsactionRes = this.transactionRes;

    // 关闭模态框并导航到 sellComplete 页面
    this.dialogRef.close();
    this.router.navigate(["/sellComplete"]);

  }

  cancel(): void {
    this.dialogRef.close(false);
  }
}