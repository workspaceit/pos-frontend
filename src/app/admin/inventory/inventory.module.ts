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
import { ProductAutoCompleteComponent } from './components/product-auto-complete/product-auto-complete.component';
import { FormsModule } from '@angular/forms';
import {TypeaheadModule} from 'ngx-bootstrap';
import {InventoryTotalPricePipe} from '../../pipes/inventory-total-price.pipe';
@NgModule({
  imports: [
    CommonModule,
    InventoryRoutingModule,
    DropzoneModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    FormsModule,
    TypeaheadModule.forRoot()
  ],
  declarations: [ProductListComponent,
    ProductAddComponent,
    ProductPurchaseComponent,
    ProductUpdateComponent,
    ProductAutoCompleteComponent,
    InventoryTotalPricePipe],
  exports:[ProductAutoCompleteComponent]
})
export class InventoryModule { }
