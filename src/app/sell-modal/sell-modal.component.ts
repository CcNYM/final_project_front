import { Component ,Inject} from '@angular/core';
import { SellServiceService } from '../sell-complete/sell-service.service';
import { Router } from '@angular/router';
import { MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
  selector: 'app-sell-modal',
  templateUrl: './sell-modal.component.html',
  styleUrls: ['./sell-modal.component.scss']
})
export class SellModalComponent {

  quantity: number = 1;


  constructor(
    private dialogRef: MatDialogRef<SellModalComponent>, 
    private sellService: SellServiceService, private router:Router,  
     @Inject(MAT_DIALOG_DATA) public data: { volume:number }) {
  }

  // confirm(): void {
  //   // 关闭模态框并传递结果给父组件
  //   this.dialogRef.close({ confirm: true, quantity: this.quantity });
  // }

  confirm(): void {

    if (this.isQuantityValid())
    {
      // 保存传递的值到 SellService 服务的属性中
      this.sellService.sellData = { confirm: true, quantity: this.quantity };
        
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
