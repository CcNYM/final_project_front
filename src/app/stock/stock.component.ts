import { ActivatedRoute, Router, Params } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { SellModalComponent } from '../sell-modal/sell-modal.component';
import { BuyModalComponent } from '../buy-modal/buy-modal.component';
import { HttpClient } from '@angular/common/http';
import { SingleStockDetail } from '../domain/singleStockDetail';
import { PriceTrend } from '../domain/priceTrend';
import { StockdetailApiService } from '../api-service/stockdetail-api.service';
import { UserApiService } from '../api-service/user-api.service';


@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit, OnDestroy {
  stockId: number = 0;
  principle: number = 0;
  timer: any;
  offset: number = 0;
  xValues: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  priceTrend: PriceTrend = { priceList: [] };
  singleStockDetail: SingleStockDetail = {
    holdingVolume: 0,
    stockName: "",
    holdingPrincipal: 0,
    fluctuationRate: 0,
    fluctuationPrice: 0,
    maxPrice: 0,
    minPrice: 0,
    currentPrice: 0,
    currentInterestRate: 0
  };


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private stockDetailService: StockdetailApiService,
    private userService: UserApiService
  ) {
    this.canvasRef = {} as ElementRef<HTMLCanvasElement>;
  }


  currentPrice = 10

  shouldShowSellButton = true   

  ngOnInit(): void {
    // TODO 6 ngOnInit implementation
    this.route.params.subscribe((params) => {
      if (params['stockId'] > 0) {
        this.stockId = params['stockId']
      }
    });
    this.loadPrinciple(1);
    this.loadStockDetail();
    this.loadWeeklyTrend();
    this.timer = setInterval(() => {
      this.loadPrinciple(1);
      this.loadStockDetail();
      this.loadWeeklyTrend();
      this.offset = (this.offset+1)%this.xValues.length;
      console.log("+10s")
    },10000)
  }

  ngOnDestroy(): void {
      clearInterval(this.timer);
  }


  loadPrinciple(userId: number): void{
    this.userService.getUserPrincipleHoldings(userId).subscribe({
      next: (principle: number) => (this.principle = principle),
      error: (error) => console.error('Error occured' + error),
    })
  }

  loadStockDetail(): void {
    this.stockDetailService.getSingleStockDetatil(1, this.stockId).subscribe({
      next: (singlestockdetail: SingleStockDetail) => (this.singleStockDetail = singlestockdetail),
      error: (error) => (console.error('Error occured' + error)),
    })
  }

  loadWeeklyTrend(): void {
    this.stockDetailService.getWeelyTrendDetail(this.stockId).subscribe({
      next: (weeklytrend: number[]) => (this.priceTrend.priceList = weeklytrend ,this.drawChart()),
      error: (error) => (console.error('Error occured' + error)),
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

  openSellModal(): void {

    const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.panelClass = 'confirmation-dialog-container';
    dialogConfig.data = { volume: this.singleStockDetail.holdingVolume, stockId: this.stockId };

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
    dialogConfig.data = { principal: this.principle, currentPrice: this.currentPrice, stockId: this.stockId };

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


  @ViewChild('trendChart', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;


  ngAfterViewInit() {
    this.drawChart();
  }



  drawChart() {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    // 假设这是一些示例数据
    const data = this.priceTrend.priceList.reverse();
    console.log(data);

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
    const yAxisMaxValue = Math.max(...data) + 30;
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
    const xAxisLabels = this.xValues.slice(this.offset % 7).concat(this.xValues.slice(0, this.offset % 7));
    const xAxisInterval = (canvas.width - 100) / (xAxisLabels.length - 1);
    for (let i = 0; i < xAxisLabels.length; i++) {
      const x = 50 + i * xAxisInterval;
      ctx.fillText(xAxisLabels[i], x, canvas.height - 20);
    }
  }



}





