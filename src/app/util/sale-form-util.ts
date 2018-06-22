
import {SaleForm} from '../models/form/sale/sale-form';
import {SALE_TYPE} from '../models/constant/SALE_TYPE';
import {PaymentLedgerForm} from '../models/form/payment-ledger-form';

export class SaleFormUtil{
  public deleteSaleFormObjectBeforeSubmit(saleForm: SaleForm):SaleForm{
    const submittedSaleForm =<SaleForm> JSON.parse(JSON.stringify(saleForm));
    if(submittedSaleForm.type === SALE_TYPE.WHOLESALE){
      delete submittedSaleForm.consumerInfo;
    }

    this.deletePaymentAccount(submittedSaleForm,'paymentAccount');
    return submittedSaleForm;

  }
  public deletePaymentAccount(saleForm,key:string){
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
}
