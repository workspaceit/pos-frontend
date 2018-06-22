import {ReportAccountTable} from '../models/view/report-account-table';
import {ReportAccount} from '../models/data/report/report-account';
import {Injectable} from '@angular/core';

@Injectable()
export class ReportUtil{
  public getRows(reportAccounts: ReportAccount[], spaceCount: number): ReportAccountTable[] {
    let tableRows: ReportAccountTable[] = [];
    for (const ra of reportAccounts) {


      /*Hides the zero amount account and group */
      /*if (!this.isPrintable(ra)) {
        continue;
      }*/

      const tr = new ReportAccountTable();
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
