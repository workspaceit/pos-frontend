import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Wholesaler} from '../models/data/wholesaler';
import {BaseService} from './base.service';

@Injectable()
export class WholesalerService extends BaseService {

  constructor(private httpClient: HttpClient) { super(); }

  public createWholesaler(wholesalerValues): Observable<Wholesaler> {
    let params = new HttpParams()
      .set('wholesalerId',wholesalerValues['wholesalerId'])
      .set('company.title', wholesalerValues['company.title'])
      .set('company.address', wholesalerValues['company.address'])
      .set('company.phone', wholesalerValues['company.phone'])
      .set('company.email', wholesalerValues['company.email']);

    return this.httpClient.post<Wholesaler>(this.authApiUrl + '/api/wholesaler/create', params);
  }

  public getWholesalers(): Observable<Wholesaler[]>{
    return this.httpClient.get<Wholesaler[]>(this.authApiUrl + '	/api/wholesaler/get-all');
  }

}
