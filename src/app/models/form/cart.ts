
import {CartDetails} from './cart-details';

export class Cart{
  public cartDetails:CartDetails[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
