import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthGuard} from './guard/auth.guard';
import {AuthService} from './services/auth.service';
import {GeneralInterceptor} from './interceptors/general-interceptor';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import * as $ from 'jquery';
import {CommonModule} from '@angular/common';
import { InvalidMessageDirective } from './directives/invalid-message.directive';
import { InvalidTypeDirective } from './directives/invalid-type.directive';
import { FourZeroFourComponent } from './components/four-zero-four/four-zero-four.component';




@NgModule({
  declarations: [
    AppComponent,
    InvalidMessageDirective,
    InvalidTypeDirective,
    FourZeroFourComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule

  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: GeneralInterceptor,
    //   multi: true
    // },
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
