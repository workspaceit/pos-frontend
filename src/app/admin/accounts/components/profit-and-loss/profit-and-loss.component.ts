import { Component, OnInit } from '@angular/core';
import { ReportService} from '../../../../services/report.service';
import {ProfitAndLossReport} from '../../../../models/data/report/profit-and-loss-report';
import {ReportAccount} from '../../../../models/data/report/report-account';
import {ProfitAndLossTable} from '../../../../models/view/profit-and-loss-table';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-profit-and-loss',
  templateUrl: './profit-and-loss.component.html',
  styleUrls: ['./profit-and-loss.component.css'],
  providers:[ReportService]
})
export class ProfitAndLossComponent implements OnInit {
  protected expenseTableRows: ProfitAndLossTable[];
  protected incomeTableRows: ProfitAndLossTable[];
  protected profitAndLossReport: ProfitAndLossReport;
  protected searchedDate={from:'',to:''};
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
      const expense = this.getRows(this.profitAndLossReport.expenseAccounts, 10);
      const income = this.getRows(this.profitAndLossReport.incomeAccounts, 10);

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
  private getRows(reportAccounts: ReportAccount[], spaceCount: number): ProfitAndLossTable[] {
    let tableRows: ProfitAndLossTable[] = [];
    for (const ra of reportAccounts) {


      if (!this.isPrintable(ra)) {
        continue;
      }

      const tr = new ProfitAndLossTable();
      tr.id = ra.id;
      tr.title = ra.title;
      tr.amount = ra.amount;
      tr.isGroup = ra.isGroup;
      tr.spaces = spaceCount;
      tableRows.push(tr);

      if (ra.child != null) {
        const tmpTableRows = this.getRows(ra.child, spaceCount + 10);
        tableRows = tableRows.concat(tmpTableRows);
      }

    }
    console.log('tableRows', tableRows);
    return tableRows;
  }

  private isPrintable(reportAccount: ReportAccount) {

    if (reportAccount.isGroup) {
      return this.isGroupPrintable(reportAccount);
    } else {
      return this.isLedgerPrintable(reportAccount);
    }
  }

  private isLedgerPrintable(reportAccount: ReportAccount) {

    if (reportAccount.amount > 0) {
      return true;
    } else {
      return false;
    }

  }

  private isGroupPrintable(reportAccount: ReportAccount) {
    const reportAccountChild = reportAccount.child;
    if (reportAccountChild === null || reportAccountChild.length === 0) {
      return false;
    }

    for (const raChild of reportAccountChild) {
      const flag = this.isPrintable(raChild);
      if (flag) return true;
    }
    return false;
  }
}
