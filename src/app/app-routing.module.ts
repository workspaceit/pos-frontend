import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './guard/auth.guard';

const routes: Routes = [
  { 'path': '', loadChildren: './public/public.module#PublicModule' },
  { 'path': 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
