import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardLayoutComponent } from './components/dashboard-layout/dashboard-layout.component';

import { CompanyInfoComponent } from './components/company-info/company-info.component';
import { NavDashboardComponent } from './components/nav-dashboard/nav-dashboard.component';
import { NavInnerComponent } from './components/nav-inner/nav-inner.component';
import { InnerLayoutComponent } from './components/inner-layout/inner-layout.component';
import { FooterComponent } from './components/footer/footer.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from '../interceptors/auth-interceptor';
import {AuthService} from '../services/auth.service';
import { SupplierListComponent } from './supplier/components/supplier-list/supplier-list.component';
import {DropzoneModule} from 'ngx-dropzone-wrapper';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    DropzoneModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthService
  ],
  declarations: [DashboardComponent, DashboardLayoutComponent, InnerLayoutComponent, CompanyInfoComponent, NavDashboardComponent,
    NavInnerComponent,
    FooterComponent]
})
export class AdminModule { }
