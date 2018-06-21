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
  protected expenseTableRows:ProfitAndLossTable[];
  protected incomeTableRows:ProfitAndLossTable[];

  protected profitAndLossReport:ProfitAndLossReport;

  constructor(private categoryService:CategoryService) {
    this.expenseTableRows = [];
    this.incomeTableRows = [];

    this.profitAndLossReport = new ProfitAndLossReport();
  }

  private getProfitAndLoss(){
    this.categoryService.getProfitAndLoss('2014-02-02','2018-08-12').subscribe(value => {
        this.profitAndLossReport = value;
        const expense = this.getRows( this.profitAndLossReport.expenseAccounts,10);
        const income = this.getRows( this.profitAndLossReport.incomeAccounts,10);

        this.expenseTableRows =  this.expenseTableRows.concat(expense);
        this.incomeTableRows =  this.incomeTableRows.concat(income);


    });
  }
  ngOnInit() {
    this.getProfitAndLoss();
  }
  private getRows(reportAccounts:ReportAccount[],spaceCount:number):ProfitAndLossTable[]{
    let tableRows: ProfitAndLossTable[] = [];
    for(const ra of reportAccounts){
      const tr = new ProfitAndLossTable();
      tr.id = ra.id;
      tr.title = ra.title;
      tr.amount = ra.amount;
      tr.isGroup = ra.isGroup;
      tr.spaces = spaceCount;
      tableRows.push(tr);
      if(ra.child!=null){
        const tmpTableRows =  this.getRows(ra.child,spaceCount+10);
        tableRows = tableRows.concat(tmpTableRows );
      }

    }
    console.log('tableRows',tableRows);
    return tableRows;
  }
}
