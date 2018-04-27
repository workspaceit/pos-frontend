import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierInfoComponent } from './components/supplier-info/supplier-info.component';
import { SupplierAddComponent } from './components/supplier-add/supplier-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SupplierListComponent} from './components/supplier-list/supplier-list.component';

@NgModule({
  imports: [
    CommonModule,
    SupplierRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SupplierInfoComponent, SupplierAddComponent, SupplierListComponent]
})
export class SupplierModule { }
