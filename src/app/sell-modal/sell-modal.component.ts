import { Component ,Inject} from '@angular/core';
import { SellServiceService } from '../sell-complete/sell-service.service';
import { Router } from '@angular/router';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';
import { TradingApiService } from '../api-service/trading-api.service';
import { TransactionRes } from '../domain/trainsactionRes';
import { Trainsaction } from '../domain/transaction';
import { DatePipe } from '@angular/common';

import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-sell-modal',
  templateUrl: './sell-modal.component.html',
  styleUrls: ['./sell-modal.component.scss']
})
export class SellModalComponent {

  constructor(
    private dialogRef: MatDialogRef<SellModalComponent>, 
    private sellService: SellServiceService, private router:Router,  
     @Inject(MAT_DIALOG_DATA) public data: { volume:number,stockId:number },
    private tradingApiService:TradingApiService,
    private datePipe: DatePipe,
    ) {
  }

  quantity: number = 1;
  trainsactionList:Trainsaction[]=[]
  transactionRes:TransactionRes = {totalValue:0,benefit:0,principal:0,status:'test'}

  

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

      let trainsaction:Trainsaction = {stockId:this.data.stockId, userId:1,volume:this.quantity,trainsactionStatus:1,createTime:this.datePipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss')}
      this.trainsactionList.push(trainsaction)


      // const checkSquareRoot = async (value: number) => {
      //   const response = await exampleSquareRootFunction(value);
      //   if (response.success) {
      //     response.value;
      //   }
      // };

      // 调用交易函数
      await this.stockTransaction()

   
      console.log('last the trainsactionRes is ')
      console.log(this.transactionRes)
 

      // 保存传递的值到 SellService 服务的属性中
      this.sellService.trainsactionRes = this.transactionRes;


        
      // 关闭模态框并导航到 sellComplete 页面
      this.dialogRef.close();
      this.router.navigate(["/sellComplete"]);
    }
    else {
      alert('Invalid input. Please enter a valid quantity.');
    }
  }
    
  cancel(): void {
    // 关闭模态框并传递结果给父组件
    this.dialogRef.close({ confirm: false });
  }

  private isQuantityValid(): boolean {
    // 设置限度值
    const maxQuantity = this.data.volume;

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
