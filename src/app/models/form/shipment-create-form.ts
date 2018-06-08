import {SHIPMENT_COST} from '../constant/SHIPMENT_COST';

export class ShipmentCreateForm {
  trackingId:string;
  supplierId:number;
  cost: Map<SHIPMENT_COST, string>;
  purchaseDate:string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}

