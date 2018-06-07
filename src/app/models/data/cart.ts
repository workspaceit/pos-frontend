import {Product} from './product';
import {InventoryCreateForm} from '../form/inventory-create-form';

export class Cart{
  public products:Product[];
  public invetoryForms:InventoryCreateForm[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
