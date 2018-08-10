import { Component, OnInit } from '@angular/core';
import {ReportService} from '../../../../services/report.service';
import {BalanceSheetReport} from '../../../../models/data/report/balance-sheet-report';
import {ReportAccountTable} from '../../../../models/view/report-account-table';
import {ReportUtil} from '../../../../util/report-util';

@Component({
  selector: 'app-balance-sheet',
  templateUrl: './balance-sheet.component.html',
  styleUrls: ['./balance-sheet.component.css'],
  providers:[ReportService,ReportUtil]
})
export class BalanceSheetComponent implements OnInit {
  protected assetTableRows: ReportAccountTable[];
  protected liabilityTableRows: ReportAccountTable[];
  protected balanceSheetReport: BalanceSheetReport;
  protected searchedDate = {from:'',to:''};

  constructor(private reportService:ReportService,private reportUtil:ReportUtil) {
    this.balanceSheetReport = new BalanceSheetReport();
  }

  ngOnInit() {
    this.getBalanceSheet();
  }
  public getBalanceSheet(){


    this.assetTableRows= [];
    this.liabilityTableRows= [];
    this.reportService.getBalanceSheet(this.searchedDate.from, this.searchedDate.to).subscribe(value => {
      console.log(value);
      this.balanceSheetReport = value;
      const assets = this.reportUtil.getRows(this.balanceSheetReport.assetsAccounts, 10);
      const liabilities = this.reportUtil.getRows(this.balanceSheetReport.liabilityAccounts, 10);

      this.assetTableRows = this.assetTableRows.concat(assets);
      this.liabilityTableRows = this.liabilityTableRows.concat(liabilities);

    });
  }
}
