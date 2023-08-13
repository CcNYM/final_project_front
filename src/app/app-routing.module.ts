import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MarketComponent } from './market/market.component';
import { StockComponent } from './stock/stock.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { SellCompleteComponent } from './sell-complete/sell-complete.component';

const routes: Routes = [
  {path:'sellComplete',component:SellCompleteComponent},
  {path:'portfolio',component:PortfolioComponent},
  {path: 'stock/:stockId', component: StockComponent },
  {path:'market',component:MarketComponent},
  {path:'',redirectTo:"/market",pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
