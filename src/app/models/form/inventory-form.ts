export class InventoryFrom {
  public productId: number;
  public purchasePrice: number;
  public sellingPrice: number;
  public purchaseQuantity: number ;
  public status: PRODUCT_CONDITION ;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
