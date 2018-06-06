import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './components/dashboard/dashboard.component';
import {DashboardLayoutComponent} from './components/dashboard-layout/dashboard-layout.component';
import {InnerLayoutComponent} from './components/inner-layout/inner-layout.component';

const routes: Routes = [
  { path: '', component: InnerLayoutComponent,
    children: [
      { path: 'inventory', loadChildren: './inventory/inventory.module#InventoryModule' },
      { path: 'employee', loadChildren: './employee/employee.module#EmployeeModule' },
      { path: 'supplier', loadChildren: './supplier/supplier.module#SupplierModule' },
      { path: 'report', loadChildren: './report/report.module#ReportModule' },
      { path: 'accounts', loadChildren: './accounts/accounts.module#AccountsModule' },
      { path: 'sale', loadChildren: './sale/sale.module#SaleModule' },
      { path: 'wholesaler', loadChildren: './wholesaler/wholesaler.module#WholesalerModule' },
      { path: 'shop', loadChildren: './shop/shop.module#ShopModule' },
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
