import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FooterComponent } from './components/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import {GeneralInterceptor} from '../interceptors/general-interceptor';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from '../services/auth.service';

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: GeneralInterceptor,
      multi: true
  }, AuthService],
  declarations: [HeaderComponent, LayoutComponent, LoginComponent, SignupComponent, FooterComponent, ForgotPasswordComponent,
    ResetPasswordComponent]
})
export class PublicModule { }
