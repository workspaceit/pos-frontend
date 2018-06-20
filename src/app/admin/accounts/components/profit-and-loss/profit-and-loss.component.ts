import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../../services/report.service';
import {ProfitAndLossReport} from '../../../../models/data/report/profit-and-loss-report';
import {ReportAccount} from '../../../../models/data/report/report-account';

@Component({
  selector: 'app-profit-and-loss',
  templateUrl: './profit-and-loss.component.html',
  styleUrls: ['./profit-and-loss.component.css'],
  providers:[CategoryService]
})
export class ProfitAndLossComponent implements OnInit {
  protected tableRows:ReportAccount[];
  protected profitAndLossReport:ProfitAndLossReport;

  constructor(private categoryService:CategoryService) {
    this.tableRows = [];
   this.profitAndLossReport = new ProfitAndLossReport();
  }

  private getProfitAndLoss(){
    this.categoryService.getProfitAndLoss('2014-02-02','2018-08-12').subscribe(value => {
        this.profitAndLossReport = value;
        this.tableRows =  this.getRows( this.profitAndLossReport.expenseAccounts);


    });
  }
  ngOnInit() {
    this.getProfitAndLoss();
  }
  private getRows(reportAccounts:ReportAccount[]):ReportAccount[]{
    const tableRows: ReportAccount[] = [];
    for(const ra of reportAccounts){
      tableRows.push(ra);

      const tmpTableRows =  this.getRows(ra.child);
      this.tableRows = tableRows.concat(tmpTableRows );
    }
    console.log("tableRows",tableRows);
    return tableRows;
  }
}
