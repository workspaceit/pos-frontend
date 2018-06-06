import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShopInfoComponent } from './components/shop-info/shop-info.component';
const routes: Routes = [
  {path: 'get' ,component: ShopInfoComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopRoutingModule { }
