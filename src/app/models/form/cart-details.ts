
import {InventoryCreateForm} from './inventory-create-form';
import {Product} from '../data/product';

export class CartDetails{
  public product:Product;
  public inventoryForm:InventoryCreateForm;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
