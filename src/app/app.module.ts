import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarketComponent } from './market/market.component';
import { StockComponent } from './stock/stock.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { MatDialogModule } from '@angular/material/dialog';
import { SellCompleteComponent } from './sell-complete/sell-complete.component';
import { SellModalComponent } from './sell-modal/sell-modal.component';
import { BuyModalComponent } from './buy-modal/buy-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    MarketComponent,
    StockComponent,
    PortfolioComponent,
    ConfirmationDialogComponent,
    SellCompleteComponent,
    SellModalComponent,
    BuyModalComponent,
 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
