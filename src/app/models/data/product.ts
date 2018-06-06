import {Category} from './category';

export class Product {

  id: number;
  category: Category;
  name: string;
  weight: number;
  weightUnit: string;
  image: string;
  barcode: string;
  totalAvailableQuantity: number;
  maxPrice: number;
  minPrice: number;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
