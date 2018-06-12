import {Product} from '../../data/product';
import {SaleCartInventory} from './sale-cart-inventory';

export class SaleCartProduct{
  public product:Product;
  public saleCartInventory:SaleCartInventory[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
