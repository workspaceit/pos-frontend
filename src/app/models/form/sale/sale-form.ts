import {InventorySaleForm} from './inventory-sale-form';
import {PaymentLedgerForm} from '../purchase-payment-create-form';
import {SALE_TYPE} from '../../constant/SALE_TYPE';
import {ConsumerForm} from '../consumer-form';

export class SaleForm{
  inventories:InventorySaleForm[];
  discount:number;
  vat:number;
  type:SALE_TYPE;
  date:string;
  description:string;
  wholesalerId:number;
  paymentAccount:PaymentLedgerForm[];
  consumerInfoId:number;
  consumerInfo:ConsumerForm;
  constructor(values: Object = {}) {

    Object.assign(this, values);
  }
}
