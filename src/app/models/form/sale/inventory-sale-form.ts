export class InventorySaleForm{
  public inventoryId:number;
  public sellingPrice:number;
  public quantity:number;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
