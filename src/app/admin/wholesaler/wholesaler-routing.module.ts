import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WholesalerInfoComponent} from './components/wholesaler-info/wholesaler-info.component';
import {WholesalerAddComponent} from './components/wholesaler-add/wholesaler-add.component';
import {WholesalerListComponent} from './components/wholesaler-list/wholesaler-list.component';

const routes: Routes = [
  { path: 'details/1', component: WholesalerInfoComponent },
  { path: 'add', component: WholesalerAddComponent },
  { path: 'list', component: WholesalerListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WholesalerRoutingModule { }
