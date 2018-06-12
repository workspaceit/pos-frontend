import {InventorySaleForm} from './inventory-sale-form';
import {PaymentLedgerForm} from '../purchase-payment-create-form';
import {SALE_TYPE} from '../../constant/SALE_TYPE';

export class SaleForm{
  inventories:InventorySaleForm[];
  discount:number;
  vat:number;
  type:SALE_TYPE;
  date:string;
  description:string;
  wholesalerId:number;
  paymentAccount:PaymentLedgerForm[];
  constructor(values: Object = {}) {

    Object.assign(this, values);
  }
}
