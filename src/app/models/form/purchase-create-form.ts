import {InventoryCreateForm} from './inventory-create-form';
import {ShipmentCreateForm} from './shipment-create-form';
import {PaymentLedgerForm} from './payment-ledger-form';
export class PurchaseCreateForm {
  inventories: InventoryCreateForm[];
  shipment: ShipmentCreateForm;
  productPricePaymentAccount: PaymentLedgerForm[];
  shippingCostPaymentAccount:PaymentLedgerForm;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
