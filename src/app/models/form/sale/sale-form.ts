import {InventorySaleForm} from './inventory-sale-form';
import {SALE_TYPE} from '../../constant/SALE_TYPE';
import {ConsumerForm} from '../consumer-form';
import {PaymentLedgerForm} from '../payment-ledger-form';

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
