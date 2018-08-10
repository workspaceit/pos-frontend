import {Supplier} from '../supplier';
import {Entry} from '../accounting/entry';
import {Inventory} from '../Inventory';
import {ShipmentTransaction} from './shipment-transaction';
import {Employee} from '../employee';

export class Shipment {

  id: number;
  trackingId: string;
  supplier: Supplier = new Supplier();
  entry: Entry = new Entry();
  inventory: Inventory = new Inventory();
  cfCost: number;
  carryingCost: number;
  laborCost: number;
  otherCost: number;
  totalQuantity: number;
  totalProductPrice: number;
  totalCost: number;
  transactions: ShipmentTransaction = new ShipmentTransaction();
  totalPaid: number;
  purchasedBy: Employee = new Employee();
  purchasedDate: Date;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
