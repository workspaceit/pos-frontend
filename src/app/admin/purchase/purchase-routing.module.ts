import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ShipmentListComponent} from './shipment-list/shipment-list.component';

const routes: Routes = [ { path: 'shipments/list', component: ShipmentListComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
