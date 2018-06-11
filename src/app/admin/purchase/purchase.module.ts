import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseRoutingModule } from './purchase-routing.module';
import { ShipmentListComponent } from './shipment-list/shipment-list.component';

@NgModule({
  imports: [
    CommonModule,
    PurchaseRoutingModule
  ],
  declarations: [ShipmentListComponent]
})
export class PurchaseModule { }
