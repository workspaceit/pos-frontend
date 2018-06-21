import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../../services/report.service';
import {ProfitAndLossReport} from '../../../../models/data/report/profit-and-loss-report';
import {ReportAccount} from '../../../../models/data/report/report-account';
import {ProfitAndLossTable} from '../../../../models/view/profit-and-loss-table';

@Component({
  selector: 'app-profit-and-loss',
  templateUrl: './profit-and-loss.component.html',
  styleUrls: ['./profit-and-loss.component.css'],
  providers:[CategoryService]
})
export class ProfitAndLossComponent implements OnInit {
  protected expenseTableRows: ProfitAndLossTable[];
  protected incomeTableRows: ProfitAndLossTable[];
  protected profitAndLossReport: ProfitAndLossReport;
  protected date={from:'',to:''};
  constructor(private categoryService: CategoryService) {
    this.expenseTableRows = [];
    this.incomeTableRows = [];
    this.profitAndLossReport = new ProfitAndLossReport();

    this.date.from='2010-08-01';
    this.date.to='2018-08-01';

  }

  private getProfitAndLoss() {
    this.expenseTableRows= [];
    this.incomeTableRows= [];
    this.categoryService.getProfitAndLoss(this.date.from, this.date.to).subscribe(value => {
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
      componentRef.date.from = (<any>$)(this).val();
    });
    (<any>$('#endDate')).datepicker({
      dateFormat: 'yy-mm-dd'
    }).on('change', function () {
      console.log('changed');
      componentRef.date.to = (<any>$)(this).val();
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
