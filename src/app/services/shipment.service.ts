import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {PurchaseCreateForm} from '../models/form/purchase-create-form';
import {Observable} from 'rxjs/Observable';
import {ShipmentListResponse} from '../models/response-models/shipment-list-response';

@Injectable()
export class ShipmentService extends BaseService {

  constructor(private httpClient: HttpClient) { super(); }

  public create(purchaseCreateForm: PurchaseCreateForm):Observable<any> {
    const options = {headers: {'Content-Type': 'application/json'}};

     return this.httpClient.post<any>(this.authApiUrl + '/api/shipment/create',JSON.stringify(purchaseCreateForm),options);
  }
  public getAll(limit: number, offset: number):Observable<ShipmentListResponse> {

    return this.httpClient.get<ShipmentListResponse>(this.authApiUrl + '/api/shipment/get-all/'+limit+'/'+offset);
  }
}
