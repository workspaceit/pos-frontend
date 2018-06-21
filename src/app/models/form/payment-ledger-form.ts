export class PaymentLedgerForm{
  ledgerId: number;
  public amount: number;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
