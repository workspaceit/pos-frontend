import {PRODUCT_CONDITION} from '../constant/PRODUCT_CONDITION';
import {STOCK_STATUS} from '../constant/STOCK_STATUS';
import {INVENTORY_CYCLE} from '../constant/INVENTORY_CYCLE';

export class Inventory{
  public id:number;
  public sellingPrice:number;
  public purchasePrice:number;
  public purchaseQuantity:number;
  public soldQuantity:number;
  public availableQuantity:number;
  public condition:PRODUCT_CONDITION;
  public status: STOCK_STATUS;
  public inventoryCycle:INVENTORY_CYCLE;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
