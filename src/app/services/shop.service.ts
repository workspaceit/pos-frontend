import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Shop} from '../models/data/shop';
import {AuthService} from './auth.service';
import {Employee} from '../models/data/employee';

@Injectable()
export class ShopService extends BaseService{

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    super();
  }
  public createShopInfo(shop): Observable<Shop> {

    let jsonParams = {
      'name':shop['name'],
      'address':shop['address'],
      'imageToken':shop['imageToken'],
      'email':shop['email'],
      'phone':shop['phone']
    };
    return this.httpClient.post<Shop>(this.authApiUrl + '/api/shop/create-or-update', jsonParams);
  }
  public getShopInfo(): Observable<Shop>{
    return this.httpClient.get<Shop>(this.authApiUrl + '/api/shop/get');
  }

}
