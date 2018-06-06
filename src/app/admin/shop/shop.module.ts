import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopInfoComponent } from './components/shop-info/shop-info.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropzoneModule} from 'ngx-dropzone-wrapper';

@NgModule({
  imports: [
    CommonModule,
    ShopRoutingModule,
    FormsModule,
    DropzoneModule,
    ReactiveFormsModule
  ],
  declarations: [ShopInfoComponent]
})
export class ShopModule { }
