import {ReportAccount} from './report-account';

export class ProfitAndLossReport{
  public incomeAccounts: ReportAccount[];
  public expenseAccounts: ReportAccount[];
  public totalRevenue:number;
  public grossProfit:number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
