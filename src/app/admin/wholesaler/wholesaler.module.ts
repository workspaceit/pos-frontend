import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WholesalerRoutingModule } from './wholesaler-routing.module';
import { WholesalerInfoComponent } from './components/wholesaler-info/wholesaler-info.component';
import { WholesalerAddComponent } from './components/wholesaler-add/wholesaler-add.component';
import {ReactiveFormsModule} from '@angular/forms';
import { WholesalerListComponent } from './components/wholesaler-list/wholesaler-list.component';

@NgModule({
  imports: [
    CommonModule,
    WholesalerRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [WholesalerInfoComponent, WholesalerAddComponent, WholesalerListComponent]
})
export class WholesalerModule { }
