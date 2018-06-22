import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {SaleListResponse} from '../models/response-models/sale-list-response';
import {SaleForm} from '../models/form/sale/sale-form';
import {SALE_TYPE} from '../models/constant/SALE_TYPE';
import {SaleFormUtil} from '../util/sale-form-util';

@Injectable()
export class SaleService extends BaseService{
   private saleFormUtil:SaleFormUtil;
  constructor(private httpClient: HttpClient) { super();
    this.saleFormUtil = new SaleFormUtil();
  }

  public create(saleForm: SaleForm):Observable<any> {
    const options = {headers: {'Content-Type': 'application/json'}};
    const submittedSaleForm =  this.saleFormUtil.deleteSaleFormObjectBeforeSubmit(saleForm);



    return this.httpClient.post<any>(this.authApiUrl + '/api/sale/create',JSON.stringify(submittedSaleForm),options);
  }

  public getAll(limit: number, offset: number):Observable<SaleListResponse> {

    return this.httpClient.get<SaleListResponse>(this.authApiUrl + '/api/sale/get-all/');
  }

}
