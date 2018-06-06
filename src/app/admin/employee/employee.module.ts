import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeAddComponent } from './components/employee-add/employee-add.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { EmployeeUpdateComponent } from './components/employee-update/employee-update.component';

@NgModule({
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [EmployeeListComponent, EmployeeAddComponent, EmployeeUpdateComponent]
})
export class EmployeeModule { }
