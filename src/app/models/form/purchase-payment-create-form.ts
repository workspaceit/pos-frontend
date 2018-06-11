export class PaymentLedgerForm{
  ledgerId: number;
  amount: number;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
