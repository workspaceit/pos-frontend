import {Address} from './address';

export class Company {
  id: number;
  address: Address = new Address();
  title: string;
  email: string
  phone: string;
  createdAt: Date;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
