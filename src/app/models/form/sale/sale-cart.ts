
import {SaleCartProduct} from './sale-cart-product';

export class SaleCart{
  public saleCartProduct:SaleCartProduct[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
