import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierInfoComponent } from './components/supplier-info/supplier-info.component';
import { SupplierAddComponent } from './components/supplier-add/supplier-add.component';

@NgModule({
  imports: [
    CommonModule,
    SupplierRoutingModule
  ],
  declarations: [SupplierInfoComponent, SupplierAddComponent]
})
export class SupplierModule { }
