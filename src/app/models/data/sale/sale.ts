import {Employee} from '../employee';
import {Entry} from '../accounting/entry';
import {Wholesaler} from '../wholesaler';
import {PersonalInformation} from '../personal-information';
import {SaleDetails} from './saleDetails';
import {SALE_TYPE} from '../../constant/SALE_TYPE';

export class Sale {
  id: number;
  trackingId: string;
  soldBy: Employee = new Employee();
  entry: Entry = new Entry();
  wholesaler: Wholesaler = new Wholesaler();
  consumer: PersonalInformation = new PersonalInformation();
  saleDeatils: SaleDetails[];
  type: SALE_TYPE;
  discount: number;
  vat: number;
  totalQuantity: number;
  totalReturnedQuantity: number;
  totalPrice: number;
  totalDue: number;
  totalReceive: number;
  totalRefundAmount: number;
  totalRefundAmountPaid: number;
  totalRefundAmountDue: number;
  description: string;
  date: string;
}
