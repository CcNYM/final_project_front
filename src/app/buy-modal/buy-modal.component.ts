import { Component ,Inject} from '@angular/core';
import { SellServiceService } from '../sell-complete/sell-service.service';
import { Router } from '@angular/router';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TradingApiService } from '../api-service/trading-api.service';
import { TransactionRes } from '../domain/trainsactionRes';
import { Trainsaction } from '../domain/transaction';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.scss']
})
export class BuyModalComponent {

  quantity: number = 1;
  trainsactionList:Trainsaction[]=[]
  transactionRes:TransactionRes = {totalValue:0,benefit:0,principal:0,status:'test'}


  constructor(
    private dialogRef: MatDialogRef<BuyModalComponent>, 
    private sellService: SellServiceService, 
    private router:Router,  
     @Inject(MAT_DIALOG_DATA) public data: { principal:number , currentPrice:number, stockId:number},
    private tradingApiService : TradingApiService,
    private datePipe: DatePipe
     ) {
  }

  // confirm(): void {
  //   // 关闭模态框并传递结果给父组件
  //   this.dialogRef.close({ confirm: true, quantity: this.quantity });
  // }
  

  async stockTransaction() {
    return new Promise((resolve, reject) => {
      this.tradingApiService.startTrading(this.trainsactionList).subscribe({
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

    if (this.isQuantityValid())
    {

      let trainsaction:Trainsaction = {stockId:this.data.stockId, userId:1,volume:this.quantity,trainsactionStatus:0,createTime:this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')}
      
      this.trainsactionList.push(trainsaction)

      await this.stockTransaction()

      // // 保存传递的值到 SellService 服务的属性中
      // this.sellService.sellData = { confirm: true, quantity: this.quantity };
        
      // 关闭模态框并导航到 stock/:stockId 页面
      this.dialogRef.close();
      this.router.navigate(['/stock', this.data.stockId]);

      alert('Purchase successful');
    }
    else {
      alert('Invalid input. you dont have enough principal, or input invalid quantity.');
    }
  }
    
  cancel(): void {
    // 关闭模态框并传递结果给父组件
    
    this.dialogRef.close({ confirm: false });
  }

  private isQuantityValid(): boolean {
    // 设置限度值
    const maxQuantity = this.data.currentPrice * this.quantity;

    const minQuantity = 1;

    // 检查输入的值是否超过限度
    if (this.quantity > maxQuantity || this.quantity < minQuantity){
      return false;
    }
    else {
      return true;
    }

  }

}
