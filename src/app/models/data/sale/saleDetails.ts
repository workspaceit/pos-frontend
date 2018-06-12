import {Inventory} from '../Inventory';
import {PRODUCT_CONDITION} from '../../constant/PRODUCT_CONDITION';

export class SaleDetails {
  id: number;
  inventory: Inventory = new Inventory();
  quantity: number;
  perQuantityPrice: number;
  totalPrice: number;
  productCondition: PRODUCT_CONDITION;
}
