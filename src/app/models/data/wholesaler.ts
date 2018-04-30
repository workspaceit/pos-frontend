import {Company} from './company';

export class Wholesaler {
  id: number;
  company: Company = new Company();
  wholesalerId: string;
  createdAt: Date;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
