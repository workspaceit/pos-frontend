import {BaseService} from './base.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {Inventory} from '../models/data/Inventory';
import {PRODUCT_CONDITION} from '../models/constant/PRODUCT_CONDITION';

@Injectable()
export class InventoryService extends BaseService{
  constructor(private httpClient: HttpClient, private authService: AuthService) {
    super();
  }

  public getByProductId(productId: number): Observable<Inventory[]>{
    console.log('Here1');

    return this.httpClient.get<Inventory[]>(this.authApiUrl + '	/api/inventory/get-by-product-id/' + productId);
  }
  public getByProductIdAndCondition(productId: number,condition:PRODUCT_CONDITION): Observable<Inventory[]>{
    console.log('Here');
    return this.httpClient.get<Inventory[]>(this.authApiUrl + '	/api/inventory/get-by-product-id/' + productId+'?&condition='+condition.toString());
  }

}
