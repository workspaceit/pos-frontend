import {Inventory} from '../../data/Inventory';
import {InventorySaleForm} from './inventory-sale-form';

export class SaleCartInventory{
  public inventory:Inventory;
  public inventorySaleForm:InventorySaleForm;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
