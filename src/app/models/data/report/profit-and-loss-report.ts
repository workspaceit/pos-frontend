import {ReportAccount} from './report-account';

export class ProfitAndLossReport{
  public incomeAccounts: ReportAccount[];
  public expenseAccounts: ReportAccount[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
