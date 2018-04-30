import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SupplierInfoComponent} from './components/supplier-info/supplier-info.component';
import {SupplierAddComponent} from './components/supplier-add/supplier-add.component';
import {SupplierListComponent} from './components/supplier-list/supplier-list.component';
import {SupplierUpdateComponent} from './components/supplier-update/supplier-update.component';

const routes: Routes = [
  { path: 'details/:id', component: SupplierInfoComponent },
  { path: 'add', component: SupplierAddComponent },
  { path: 'list', component: SupplierListComponent },
  { path: 'update/:supplierId', component: SupplierUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }
