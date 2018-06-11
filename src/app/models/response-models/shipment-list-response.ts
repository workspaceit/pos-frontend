import {Shipment} from '../data/shipment/shipment';

export class ShipmentListResponse {
  result: Shipment[] = [];
  totalResult: number;
}
