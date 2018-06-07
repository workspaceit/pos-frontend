import {BaseService} from './base.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {Inventory} from '../models/data/Inventory';

@Injectable()
export class InventoryService extends BaseService{
  constructor(private httpClient: HttpClient, private authService: AuthService) {
    super();
  }

  public getByProductId(productId: number): Observable<Inventory[]>{
    return this.httpClient.get<Inventory[]>(this.authApiUrl + '	/api/inventory/get-by-product-id/' + productId);
  }

}
