import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SellToWholesalerComponent} from './components/sell-to-wholesaler/sell-to-wholesaler.component';
import {SellToConsumerComponent} from './components/sell-to-consumer/sell-to-consumer.component';
import {SaleListComponent} from './components/sale-list/sale-list.component';

const routes: Routes = [
  { path: 'sell-to-wholesaler', component: SellToWholesalerComponent },
  { path: 'sell-to-consumer', component: SellToConsumerComponent },
  { path: 'sale-list', component: SaleListComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
