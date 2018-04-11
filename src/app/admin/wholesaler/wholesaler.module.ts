import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WholesalerRoutingModule } from './wholesaler-routing.module';
import { WholesalerInfoComponent } from './components/wholesaler-info/wholesaler-info.component';
import { WholesalerAddComponent } from './components/wholesaler-add/wholesaler-add.component';

@NgModule({
  imports: [
    CommonModule,
    WholesalerRoutingModule
  ],
  declarations: [WholesalerInfoComponent, WholesalerAddComponent]
})
export class WholesalerModule { }
