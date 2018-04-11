import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {DashboardLayoutComponent} from './components/dashboard-layout/dashboard-layout.component';
import {DashboardInnerLayoutComponent} from './components/dashboard-inner-layout/dashboard-inner-layout.component';
import {CompanyInfoComponent} from './components/company-info/company-info.component';

const routes: Routes = [
  { path: '', component: DashboardInnerLayoutComponent,
    children: [
      { path: 'inventory', loadChildren: './inventory/inventory.module#InventoryModule' },
      { path: 'employee', loadChildren: './employee/employee.module#EmployeeModule' },
      { path: 'supplier', loadChildren: './supplier/supplier.module#SupplierModule' },
      { path: 'report', loadChildren: './report/report.module#ReportModule' },
      { path: 'accounts', loadChildren: './accounts/accounts.module#AccountsModule' },
      { path: 'sale', loadChildren: './sale/sale.module#SaleModule' },
      { path: 'wholesaler', loadChildren: './wholesaler/wholesaler.module#WholesalerModule' },
      { path: 'company-info', component: CompanyInfoComponent },
    ]
  },
  { path: 'dashboard', component: DashboardLayoutComponent,
    children: [
      { path: '', component: DashboardComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
