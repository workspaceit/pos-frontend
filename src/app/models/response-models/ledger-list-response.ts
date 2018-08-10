import {Ledger} from '../data/accounting/ledger';

export class LedgerListResponse {
  result: Ledger[] = [];
  totalResult: number;
}
