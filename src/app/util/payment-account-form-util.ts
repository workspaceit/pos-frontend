import {PaymentLedgerForm} from '../models/form/payment-ledger-form';

export  class PaymentAccountFormUtil{
  public deletePaymentAccounts(saleForm, key:string){
    const paymentAccounts = <PaymentLedgerForm[]>saleForm[key];
    const deletedIndex = [];
    for(let i=0;i<paymentAccounts.length;i++){
      const  paymentAccount  = paymentAccounts[i];

      if(paymentAccount.ledgerId===0){
        deletedIndex.push(i);
      }
    }
    for(let i=0;i<deletedIndex.length;i++){
      deletedIndex.splice(deletedIndex[i],1);
    }

    console.log('paymentAccounts',saleForm[key]);
    if(saleForm[key].length===0){
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
