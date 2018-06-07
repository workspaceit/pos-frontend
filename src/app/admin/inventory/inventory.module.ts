import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductPurchaseComponent } from './components/product-purchase/product-purchase.component';
import {DropzoneModule} from 'ngx-dropzone-wrapper';
import {ReactiveFormsModule} from '@angular/forms';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  imports: [
    CommonModule,
    InventoryRoutingModule,
    DropzoneModule,
    ReactiveFormsModule,
    NgxPaginationModule
  ],
  declarations: [ProductListComponent, ProductAddComponent, ProductPurchaseComponent, ProductUpdateComponent]
})
export class InventoryModule { }
