import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './guard/auth.guard';
import {FourZeroFourComponent} from './components/four-zero-four/four-zero-four.component';

const routes: Routes = [
  { 'path': '', loadChildren: './public/public.module#PublicModule' },
  { 'path': 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuard] },
  { 'path': '404', component: FourZeroFourComponent },
  { 'path': '**', redirectTo: '/404'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
