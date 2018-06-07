export class ShipmentCreateForm {
  trackingId:string;
  supplierId:number;
  cfCost:number;
  carryingCost:number;
  laborCost:number;
  otherCost:number;
  purchaseDate:number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
