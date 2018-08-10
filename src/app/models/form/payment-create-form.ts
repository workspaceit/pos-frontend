import {PaymentLedgerForm} from './payment-ledger-form';

export class PaymentCreateForm {
  public beneficial:PaymentLedgerForm = new PaymentLedgerForm();
  cashOrBank: PaymentLedgerForm[];
  narration: string;
  date: number;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
