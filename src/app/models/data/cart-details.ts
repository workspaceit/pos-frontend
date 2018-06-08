import {Product} from './product';
import {InventoryCreateForm} from '../form/inventory-create-form';

export class CartDetails{
  public product:Product;
  public inventoryForm:InventoryCreateForm;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
