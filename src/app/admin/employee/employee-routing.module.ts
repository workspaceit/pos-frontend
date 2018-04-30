import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeListComponent} from './components/employee-list/employee-list.component';
import {EmployeeAddComponent} from './components/employee-add/employee-add.component';
import {EmployeeUpdateComponent} from './components/employee-update/employee-update.component';

const routes: Routes = [
  { path: 'list', component: EmployeeListComponent },
  { path: 'add', component: EmployeeAddComponent },
  { path: 'update/:employeeId', component: EmployeeUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
