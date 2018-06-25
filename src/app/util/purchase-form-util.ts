
import {PurchaseCreateForm} from '../models/form/purchase-create-form';
import {PaymentAccountFormUtil} from './payment-account-form-util';

export class PurchaseFormUtil{
  private paymentAccountFormUtil: PaymentAccountFormUtil = new PaymentAccountFormUtil();

  public deleteSaleFormObjectBeforeSubmit(purchaseCreateForm:PurchaseCreateForm):PurchaseCreateForm{
    const submitterPurchaseCreateForm =<PurchaseCreateForm> JSON.parse(JSON.stringify(purchaseCreateForm));

    this.paymentAccountFormUtil.deletePaymentAccount(submitterPurchaseCreateForm,'shippingCostPaymentAccount');
    this.paymentAccountFormUtil.deletePaymentAccounts(submitterPurchaseCreateForm,'productPricePaymentAccount');
    return submitterPurchaseCreateForm;
  }
}
