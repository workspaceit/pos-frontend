import {InventoryCreateForm} from './inventory-create-form';
import {ShipmentCreateForm} from './shipment-create-form';
import {PurchasePaymentCreateForm} from './purchase-payment-create-form';
export class PurchaseCreateForm {
  inventories: InventoryCreateForm[];
  payment: PurchasePaymentCreateForm;
  shipment: ShipmentCreateForm;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
