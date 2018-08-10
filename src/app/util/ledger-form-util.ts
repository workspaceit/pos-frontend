import {PaymentCreateForm} from '../models/form/payment-create-form';
import {PaymentAccountFormUtil} from './payment-account-form-util';

export class LedgerFormUtil {
  private paymentAccountFormUtil: PaymentAccountFormUtil = new PaymentAccountFormUtil();

  public deletePaymentFormObjectBeforeSubmit(paymentCreateForm: PaymentCreateForm):PaymentCreateForm {
    const submittedPaymentCreateForm = <PaymentCreateForm> JSON.parse(JSON.stringify(paymentCreateForm));

    this.paymentAccountFormUtil.deletePaymentAccount(submittedPaymentCreateForm,'beneficial');
    this.paymentAccountFormUtil.deletePaymentAccounts(submittedPaymentCreateForm,'cashOrBank');
    return submittedPaymentCreateForm;
  }
}
