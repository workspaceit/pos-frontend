import {Category} from './category';
import {Inventory} from './Inventory';

export class Product {

  id: number;
  category: Category = new Category();
  name: string;
  weight: number;
  weightUnit: string;
  image: string;
  barcode: string;
  damagedQuantity:number;
  goodQuantity:number;
  totalAvailableQuantity: number;
  maxPrice: number;
  minPrice: number;
  inventories:Inventory[];

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
