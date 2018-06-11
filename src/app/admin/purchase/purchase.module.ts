import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { ShipmentListComponent } from './shipment-list/shipment-list.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [ShipmentListComponent]
})
export class PurchaseModule { }
