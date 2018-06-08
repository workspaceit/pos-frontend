import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {PurchaseCreateForm} from '../models/form/purchase-create-form';

@Injectable()
export class ShipmentService extends BaseService {

  constructor(private httpClient: HttpClient) { super(); }

  create(purchaseCreateForm: PurchaseCreateForm) {
    const options = {headers: {'Content-Type': 'application/json'}};

     this.httpClient.post<any>(this.authApiUrl + '/api/shipment/create',JSON.stringify(purchaseCreateForm),options).subscribe(
       (data) => console.log(data)
     );
  }

}
