import {PaymentLedgerForm} from './payment-ledger-form';

export class InvestmentCreateForm {
  cashOrBank: PaymentLedgerForm[];
  narration: string;
  date: number;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
