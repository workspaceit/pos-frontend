import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaleRoutingModule } from './sale-routing.module';
import {FormsModule} from '@angular/forms';
import {TypeaheadModule} from 'ngx-bootstrap';
import {InventoryModule} from '../inventory/inventory.module';
import { SaleListComponent } from './components/sale-list/sale-list.component';
import {NgxPaginationModule} from 'ngx-pagination';
import {SellComponent} from './components/sell/sell.component';

@NgModule({
  imports: [
    InventoryModule,
    CommonModule,
    SaleRoutingModule,
    FormsModule,
    NgxPaginationModule,
    TypeaheadModule.forRoot()
  ],
  declarations: [SellComponent, SaleListComponent]
})
export class SaleModule { }
