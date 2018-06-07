export class InventoryFrom {
  productId: number;
  purchasePrice: number;
  sellingPrice: number;
  purchaseQuantity: number ;
  status: PRODUCT_CONDITION ;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
