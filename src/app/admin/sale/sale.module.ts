import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleRoutingModule } from './sale-routing.module';
import { SellToConsumerComponent } from './components/sell-to-consumer/sell-to-consumer.component';
import { SellToWholesalerComponent } from './components/sell-to-wholesaler/sell-to-wholesaler.component';

@NgModule({
  imports: [
    CommonModule,
    SaleRoutingModule
  ],
  declarations: [SellToConsumerComponent, SellToWholesalerComponent]
})
export class SaleModule { }
