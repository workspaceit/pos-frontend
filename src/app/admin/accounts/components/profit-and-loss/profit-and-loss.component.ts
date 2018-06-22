import { Component, OnInit } from '@angular/core';
import { ReportService} from '../../../../services/report.service';
import {ProfitAndLossReport} from '../../../../models/data/report/profit-and-loss-report';
import {ReportAccount} from '../../../../models/data/report/report-account';
import {DatePipe} from '@angular/common';
import {ReportAccountTable} from '../../../../models/view/report-account-table';
import {ReportUtil} from '../../../../util/report-util';

@Component({
  selector: 'app-profit-and-loss',
  templateUrl: './profit-and-loss.component.html',
  styleUrls: ['./profit-and-loss.component.css'],
  providers:[ReportService]
})
export class ProfitAndLossComponent implements OnInit {
  protected expenseTableRows: ReportAccountTable[];
  protected incomeTableRows: ReportAccountTable[];
  protected profitAndLossReport: ProfitAndLossReport;
  protected searchedDate={from:'',to:''};
  protected reportUtil:ReportUtil;

  constructor(private reportService: ReportService) {
    this.expenseTableRows = [];
    this.incomeTableRows = [];
    this.profitAndLossReport = new ProfitAndLossReport();
    const datePipe = new DatePipe('en-US');
    const fromDate = new Date();
    fromDate.setMonth(fromDate.getMonth()-1);

    this.searchedDate.from = datePipe.transform(fromDate, 'yyyy-MM-dd');
    this.searchedDate.to = datePipe.transform(new Date(), 'yyyy-MM-dd');




  }

  private getProfitAndLoss() {
    this.expenseTableRows= [];
    this.incomeTableRows= [];
    this.reportService.getProfitAndLoss(this.searchedDate.from, this.searchedDate.to).subscribe(value => {
      this.profitAndLossReport = value;
      const expense = this.reportUtil.getRows(this.profitAndLossReport.expenseAccounts, 10);
      const income = this.reportUtil.getRows(this.profitAndLossReport.incomeAccounts, 10);

      this.expenseTableRows = this.expenseTableRows.concat(expense);
      this.incomeTableRows = this.incomeTableRows.concat(income);

    });
  }

  ngOnInit() {
    const componentRef = this;
    (<any>$('#startDate')).datepicker({
      dateFormat: 'yy-mm-dd'
    }).on('change', function () {
      console.log('changed');
      componentRef.searchedDate.from = (<any>$)(this).val();
    });
    (<any>$('#endDate')).datepicker({
      dateFormat: 'yy-mm-dd'
    }).on('change', function () {
      console.log('changed');
      componentRef.searchedDate.to = (<any>$)(this).val();
    });
    this.getProfitAndLoss();
  }
  public searchProfitAndLoss(){
    this.getProfitAndLoss();
  }


}
