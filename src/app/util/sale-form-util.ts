
import {SaleForm} from '../models/form/sale/sale-form';
import {SALE_TYPE} from '../models/constant/SALE_TYPE';
import {PaymentLedgerForm} from '../models/form/payment-ledger-form';
import {PaymentAccountFormUtil} from './payment-account-form-util';

export class SaleFormUtil{

  private paymentAccountFormUtil: PaymentAccountFormUtil = new PaymentAccountFormUtil();
  constructor() {
  }

  public deleteSaleFormObjectBeforeSubmit(saleForm: SaleForm):SaleForm{
    const submittedSaleForm =<SaleForm> JSON.parse(JSON.stringify(saleForm));
    if(submittedSaleForm.type === SALE_TYPE.WHOLESALE){
      delete submittedSaleForm.consumerInfo;
    }

   // this.paymentAccountFormUtil.deletePaymentAccounts(submittedSaleForm,'paymentAccount');
    return submittedSaleForm;

  }
}
