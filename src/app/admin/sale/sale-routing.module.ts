import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SellComponent} from './components/sell/sell.component';
import {SaleListComponent} from './components/sale-list/sale-list.component';

const routes: Routes = [
  { path: ':saleType', component: SellComponent },
  { path: 'get-all/list', component: SaleListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
