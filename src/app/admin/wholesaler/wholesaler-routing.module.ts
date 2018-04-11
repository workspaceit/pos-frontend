import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WholesalerInfoComponent} from './components/wholesaler-info/wholesaler-info.component';
import {WholesalerAddComponent} from './components/wholesaler-add/wholesaler-add.component';

const routes: Routes = [
  { path: 'details/1', component: WholesalerInfoComponent },
  { path: 'add', component: WholesalerAddComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WholesalerRoutingModule { }
