import {Company} from './company';

export class Supplier {

  id: number;
  company: Company = new Company();
  supplierId: string;
  createdAt: Date;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
