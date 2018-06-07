export class ProductSearchForm{
  name ='';
  categoryId =0;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
