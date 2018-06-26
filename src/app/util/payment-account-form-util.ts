import {PaymentLedgerForm} from '../models/form/payment-ledger-form';
import {formatMoment} from 'ngx-bootstrap/chronos/format';

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
  public deletePaymentAccount(form, key:string){
    const paymentAccount = <PaymentLedgerForm>form[key];
    if(paymentAccount.ledgerId===0){
      delete form[key];
    }
  }
}
