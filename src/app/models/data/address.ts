
export class Address {
  id: number;
  formattedAddress: string;
  createdAt: Date;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
