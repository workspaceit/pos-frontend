import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DailyReportComponent} from './components/daily-report/daily-report.component';
import {GeneralTableComponent} from './components/general-table/general-table.component';
import {DataTableComponent} from './components/data-table/data-table.component';

const routes: Routes = [
  { path: 'daily-report', component: DailyReportComponent },
  { path: 'data-table', component: DataTableComponent },
  { path: 'general-table', component: GeneralTableComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportRoutingModule { }
