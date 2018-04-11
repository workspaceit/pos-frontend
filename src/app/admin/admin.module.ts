import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';
import { DashboardInnerLayoutComponent } from './components/dashboard-inner-layout/dashboard-inner-layout.component';
import { CompanyInfoComponent } from './components/company-info/company-info.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  declarations: [DashboardComponent, DashboardLayoutComponent, DashboardInnerLayoutComponent, CompanyInfoComponent]
})
export class AdminModule { }
