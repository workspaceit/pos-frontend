import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SaleListResponse} from '../models/response-models/sale-list-response';

@Injectable()
export class SaleService extends BaseService{

  constructor(private httpClient: HttpClient) { super(); }

  public getAll(limit: number, offset: number):Observable<SaleListResponse> {

    return this.httpClient.get<SaleListResponse>(this.authApiUrl + '/api/sale/get-all/');
  }

}
