import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleRoutingModule } from './sale-routing.module';
import { SellToConsumerComponent } from './components/sell-to-consumer/sell-to-consumer.component';
import { SellToWholesalerComponent } from './components/sell-to-wholesaler/sell-to-wholesaler.component';
import {ProductAutoCompleteComponent} from '../inventory/components/product-auto-complete/product-auto-complete.component';
import {FormsModule} from '@angular/forms';
import {TypeaheadModule} from 'ngx-bootstrap';
import {InventoryModule} from '../inventory/inventory.module';

@NgModule({
  imports: [
    InventoryModule,
    CommonModule,
    SaleRoutingModule,
    FormsModule,
    TypeaheadModule.forRoot()
  ],
  declarations: [SellToConsumerComponent, SellToWholesalerComponent]
})
export class SaleModule { }
