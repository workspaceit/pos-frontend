import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SaleListResponse} from '../models/response-models/sale-list-response';
import {SaleForm} from '../models/form/sale/sale-form';

@Injectable()
export class SaleService extends BaseService{

  constructor(private httpClient: HttpClient) { super(); }

  public create(saleForm: SaleForm):Observable<any> {
    const options = {headers: {'Content-Type': 'application/json'}};
    console.log(JSON.stringify(saleForm));

    return this.httpClient.post<any>(this.authApiUrl + '/api/sale/create',JSON.stringify(saleForm),options);
  }

  public getAll(limit: number, offset: number):Observable<SaleListResponse> {

    return this.httpClient.get<SaleListResponse>(this.authApiUrl + '/api/sale/get-all/');
  }

}
