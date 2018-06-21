import { Component, OnInit } from '@angular/core';
import {ReportService} from '../../../../services/report.service';
import {BalanceSheetReport} from '../../../../models/data/report/balance-sheet-report';
import {ReportAccountTable} from '../../../../models/view/report-account-table';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.css'],
  providers:[ReportService]
})
export class BalanceSheetComponent implements OnInit {
  protected assetTableRows: ReportAccountTable[];
  protected liabilityTableRows: ReportAccountTable[];
  protected balanceSheetReport: BalanceSheetReport;
  protected searchedDate = {from:'',to:''};
  constructor(private reportService:ReportService) {

  }

  ngOnInit() {
    this.getBalanceSheet();
  }
  public getBalanceSheet(){
    this.reportService.getBalanceSheet(this.searchedDate.from,this.searchedDate.to);
  }
}
