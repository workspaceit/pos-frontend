export class Category {
  id: number;
  name: string;
  createdAt: Date;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
