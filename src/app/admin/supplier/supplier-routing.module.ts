import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SupplierInfoComponent} from './components/supplier-info/supplier-info.component';
import {SupplierAddComponent} from './components/supplier-add/supplier-add.component';

const routes: Routes = [
  { path: 'details/:id', component: SupplierInfoComponent },
  { path: 'add', component: SupplierAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
