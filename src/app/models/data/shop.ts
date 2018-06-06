export class Shop {

  id: number;
  name: string;
  address: string;
  imageToken: number;
  email: string;
  phone: string;
  logo: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
