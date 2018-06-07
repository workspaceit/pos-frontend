import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {WholesalerInfoComponent} from './components/wholesaler-info/wholesaler-info.component';
import {WholesalerAddComponent} from './components/wholesaler-add/wholesaler-add.component';
import {WholesalerListComponent} from './components/wholesaler-list/wholesaler-list.component';
import {WholesalerUpdateComponent} from './components/wholesaler-update/wholesaler-update.component';

const routes: Routes = [
  { path: 'details/:id', component: WholesalerInfoComponent },
  { path: 'add', component: WholesalerAddComponent },
  { path: 'list', component: WholesalerListComponent },
  { path: 'update/:wholesalerId', component: WholesalerUpdateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WholesalerRoutingModule { }
