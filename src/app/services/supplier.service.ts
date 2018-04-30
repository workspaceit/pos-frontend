import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BaseService} from './base.service';
import {Supplier} from '../models/data/supplier';

@Injectable()
export class SupplierService extends BaseService{

  constructor(private httpClient: HttpClient) {
    super();
  }

  public createSupplier(supplierValues): Observable<Supplier> {
    let params = new HttpParams()
      .set('supplierId',supplierValues['supplierId'])
      .set('company.title', supplierValues['company.title'])
      .set('company.address', supplierValues['company.address'])
      .set('company.phone', supplierValues['company.phone'])
      .set('company.email', supplierValues['company.email']);

    return this.httpClient.post<Supplier>(this.authApiUrl + '/api/supplier/create', params);
  }

  public getSuppliers(): Observable<Supplier[]>{
    return this.httpClient.get<Supplier[]>(this.authApiUrl + '	/api/supplier/get-all');
  }

  public getSupplierById(supplierId: number): Observable<Supplier>{
    return this.httpClient.get<Supplier>(this.authApiUrl + '	/api/supplier/get-by-id/' + supplierId);
  }

  public updateSupplier(supplierValues, supplierId): Observable<Supplier> {
    let params = new HttpParams()
      .set('supplierId',supplierValues['supplierId'])
      .set('company.title', supplierValues['company.title'])
      .set('company.address', supplierValues['company.address'])
      .set('company.phone', supplierValues['company.phone'])
      .set('company.email', supplierValues['company.email']);

    return this.httpClient.post<Supplier>(this.authApiUrl + '/api/supplier/update/' + supplierId, params);
  }

}
