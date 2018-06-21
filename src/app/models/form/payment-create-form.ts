import {PaymentLedgerForm} from './payment-ledger-form';

export class PaymentCreateForm {
  beneficial:PaymentLedgerForm = new PaymentLedgerForm();
  cashOrBank: PaymentLedgerForm[];
  narration: string;
  date: number;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
