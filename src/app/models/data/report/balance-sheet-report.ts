import {ReportAccount} from './report-account';

export class BalanceSheetReport{
  public assetsAccounts: ReportAccount[];
  public liabilityAccounts: ReportAccount[];
  public totalAsset:number;
  public totalLiability:number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
