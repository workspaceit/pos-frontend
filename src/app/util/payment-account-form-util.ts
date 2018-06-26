import {PaymentLedgerForm} from '../models/form/payment-ledger-form';

export  class PaymentAccountFormUtil{
  public deletePaymentAccounts(form, key:string){
    const paymentAccounts = <PaymentLedgerForm[]>form[key];
    const deletedIndex = [];

    for(let i=0;i<paymentAccounts.length;i++){
      const  paymentAccount  = paymentAccounts[i];

      if(paymentAccount.ledgerId===0){
        deletedIndex.push(i);
      }
    }

    deletedIndex.reverse();

    for(let i=0;i<deletedIndex.length;i++){
      form[key].splice(deletedIndex[i],1);
    }
    console.log(deletedIndex);
    console.log('paymentAccounts',form[key]);
    if(form[key].length===0){
      delete form[key];
    }
  }
  public deletePaymentAccount(form, key:string){
    const paymentAccount = <PaymentLedgerForm>form[key];

    if(paymentAccount.ledgerId===0){
      delete form[key];
    }
  }
}
