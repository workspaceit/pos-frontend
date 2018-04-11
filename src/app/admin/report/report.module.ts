import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { DailyReportComponent } from './components/daily-report/daily-report.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import { GeneralTableComponent } from './components/general-table/general-table.component';

@NgModule({
  imports: [
    CommonModule,
    ReportRoutingModule
  ],
  declarations: [DailyReportComponent, DataTableComponent, GeneralTableComponent]
})
export class ReportModule { }
