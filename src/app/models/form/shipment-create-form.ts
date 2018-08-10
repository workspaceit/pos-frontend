
export class ShipmentCreateForm {
  trackingId:string;
  supplierId:number;
  cost: {};
  purchaseDate:string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

