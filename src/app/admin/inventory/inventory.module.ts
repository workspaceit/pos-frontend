import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductPurchaseComponent } from './components/product-purchase/product-purchase.component';

@NgModule({
  imports: [
    CommonModule,
    InventoryRoutingModule
  ],
  declarations: [ProductListComponent, ProductAddComponent, ProductPurchaseComponent]
})
export class InventoryModule { }
