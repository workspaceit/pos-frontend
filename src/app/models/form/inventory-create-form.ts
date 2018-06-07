import {InventoryFrom} from './inventory-form';


export class InventoryCreateForm extends InventoryFrom{

  constructor(values: Object = {}) {
    super(values);
    Object.assign(this, values);
  }
}
