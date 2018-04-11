import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {DashboardLayoutComponent} from './components/dashboard-layout/dashboard-layout.component';
import {LoginComponent} from '../public/components/login/login.component';
import {DashboardInnerLayoutComponent} from './components/dashboard-inner-layout/dashboard-inner-layout.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardLayoutComponent,
    children: [
      {
        path: '', component: DashboardComponent
      },
    ]
  },
  { path: 'inventory', component: DashboardInnerLayoutComponent,
    children: [
      {
        path: '', loadChildren: './inventory/inventory.module#InventoryModule'
      },
    ]
  },
  { path: 'employee', component: DashboardInnerLayoutComponent,
    children: [
      {
        path: '', loadChildren: './employee/employee.module#EmployeeModule'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
