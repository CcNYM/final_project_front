
import { ActivatedRoute,Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { SellModalComponent } from '../sell-modal/sell-modal.component';
import { BuyModalComponent } from '../buy-modal/buy-modal.component';
import { HttpClient } from '@angular/common/http';
import { SingleStockDetail } from '../api-service/domain/SingleStockDetail';
import { PriceTrend } from '../api-service/domain/PriceTrend';
import { StockdetailApiService } from '../api-service/stockdetail-api.service';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent  implements AfterViewInit{

  constructor(private router: Router,private dialog: MatDialog, private stockDetailService: StockdetailApiService, 
    private singleStockDetail: SingleStockDetail,
    private priceTrend: PriceTrend) {

    this.canvasRef = {} as ElementRef<HTMLCanvasElement>;
  }

  principal = 5000
  currentPrice = 10
  stockId = 0
  volume = 150

  shouldShowSellButton = true

  stocks = [
    { stockId: 1, stockName: 'ABC', currentPrice: 100, rateOfReturn: 0.3, profits: 26 },
    { stockId: 2, stockName: 'XYZ', currentPrice: 200, rateOfReturn: -0.1, profits: -7 },
    { stockId: 3, stockName: 'DEF', currentPrice: 150, rateOfReturn: 0, profits: 0 }
  ];

  ngOnInit(): void {
    // TODO 6 ngOnInit implementation
    this.route.params.subscribe((params) => {
      if (params['stockId']>0) {
        this.stockId = params['stockId']
      }
    });

    this.stockDetailService.getSingleStockDetatil().subscribe(
      data => {this.singleStockDetail = data;
      });

    this.stockDetailService.getWeelyTrendDetail().subscribe(
      data => {this.priceTrend = data;
      });
  }

  showMarket() {
    // 处理显示市场的逻辑
    this.router.navigate(['/market']);
  }

  showPortfolio() {
    // 处理显示投资组合的逻辑
    this.router.navigate(['/portfolio']);
  }

  openSellModal(): void {

    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.panelClass = 'confirmation-dialog-container';
    dialogConfig.data = { volume:this.volume, stockId : this.stockId };
  
    const dialogRef = this.dialog.open(SellModalComponent, dialogConfig);

    

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.confirm) {
        // 执行出售操作
        console.log('出售数量:', result.quantity);

        // 跳转到 "Sell Complete" 页面
        this.router.navigate(['/sell-complete']);
      }
    });
  }

  openBuyModal(): void {

    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.panelClass = 'confirmation-dialog-container';
    dialogConfig.data = { principal:this.principal , currentPrice:this.currentPrice, stockId:this.stockId };
  
    const dialogRef = this.dialog.open(BuyModalComponent, dialogConfig);

    

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.confirm) {
        // 执行出售操作
        console.log('出售数量:', result.quantity);

        // 跳转到 "Sell Complete" 页面
        this.router.navigate(['/sell-complete']);
      }
    });
  }
  

  // openConfirmationDialog(): void {
  //   const dialogConfig = new MatDialogConfig();
  //   // dialogConfig.disableClose = true;
  //   // dialogConfig.autoFocus = true;
  //   // dialogConfig.panelClass = 'confirmation-dialog-container';
  //   dialogConfig.data = { message: 'Do you confirm the sale?' };
  //   dialogConfig.position = { top: '20%' };
  
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
  
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result === true) {
  //       // 用户确认销售
  //       // 执行跳转到新页面的操作
  //     } else {
  //       // 用户取消销售
  //       // 可以选择不执行任何操作或者添加其他关闭提示窗口的逻辑
  //     }
  //   });
  // }

  // stocks: any[] = []; // 假设这是你的股票数据

  @ViewChild('trendChart', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;


  ngAfterViewInit() {
    this.drawChart();
  }



  drawChart() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    // 假设这是一些示例数据
    const data = [100, 200, 150, 300, 250, 400, 350];

    // 设置画布大小
    canvas.width = 300; // 调整为合适的宽度
    canvas.height = 180; // 调整为合适的高度

    // 清空画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制 y 轴
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(canvas.width - 50, 0);
    ctx.lineTo(canvas.width - 50, canvas.height - 30);
    ctx.stroke();
  

    // 绘制 y 轴标签
    ctx.fillStyle = 'black';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    const yAxisMaxValue = Math.max(...data)+30;
    const yAxisInterval = Math.ceil(yAxisMaxValue / 5);
    for (let i = 0; i <= yAxisMaxValue; i += yAxisInterval) {
      const y = canvas.height - 30 - i * (canvas.height - 30) / yAxisMaxValue;
      ctx.fillText(i.toString(), canvas.width - 45, y + 5);
    }

    // 绘制折线
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 2;
    ctx.beginPath();
    for (let i = 0; i < data.length; i++) {
      const x = 50 + (canvas.width - 100) / (data.length - 1) * i;
      const y = canvas.height - 30 - (data[i] / yAxisMaxValue) * (canvas.height - 30);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.stroke();

    // 绘制 x 轴
    ctx.strokeStyle = '#ccc';
    ctx.beginPath();
    ctx.moveTo(50, canvas.height - 30);
    ctx.lineTo(canvas.width - 50, canvas.height - 30);
    ctx.stroke();

    // 绘制 x 轴下标
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const xAxisLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
    const xAxisInterval = (canvas.width - 100) / (xAxisLabels.length - 1);
    for (let i = 0; i < xAxisLabels.length; i++) {
      const x = 50 + i * xAxisInterval;
      ctx.fillText(xAxisLabels[i], x, canvas.height - 20);
    }
  }


  
}





