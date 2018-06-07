import {Subject} from 'rxjs/Subject';
import {Product} from '../models/data/product';
import {Injectable} from '@angular/core';

@Injectable()
export class ProductAutoCompleteCommunicator{
  private selectedProductSource = new Subject<Product>();
  public onProductSelect = this.selectedProductSource.asObservable();


  public publishSelectedProduct(product:Product){
    this.selectedProductSource.next(product);
  }

}
