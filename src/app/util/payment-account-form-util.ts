import {PaymentLedgerForm} from '../models/form/payment-ledger-form';

export  class PaymentAccountFormUtil{
  public deletePaymentAccounts(saleForm, key:string){
    const paymentAccounts = <PaymentLedgerForm[]>saleForm[key];

    for(let i=0;i<paymentAccounts.length;i++){
      const  paymentAccount  = paymentAccounts[i];

      if(paymentAccount.ledgerId===0){
        paymentAccounts.splice(i,1);
      }
    }
    if(paymentAccounts.length===0){
      delete saleForm[key];
    }
  }
  public deletePaymentAccount(saleForm, key:string){
    const paymentAccount = <PaymentLedgerForm>saleForm[key];

    if(paymentAccount.ledgerId===0){
      delete saleForm[key];
    }
  }
}
