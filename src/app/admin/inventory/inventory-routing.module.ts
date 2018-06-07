import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductAddComponent} from './components/product-add/product-add.component';
import {ProductPurchaseComponent} from './components/product-purchase/product-purchase.component';
import { ProductUpdateComponent } from './components/product-update/product-update.component';


const routes: Routes = [
  { path: 'products', component: ProductListComponent },
  { path: 'products/add', component: ProductAddComponent },
  { path: 'products/update/:productId', component: ProductUpdateComponent },
  { path: 'products/purchase', component: ProductPurchaseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
