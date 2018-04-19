import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { FooterComponent } from './components/footer/footer.component';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PublicRoutingModule,
    FormsModule
  ],
  declarations: [HeaderComponent, LayoutComponent, LoginComponent, SignupComponent, FooterComponent]
})
export class PublicModule { }
