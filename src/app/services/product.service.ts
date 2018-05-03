import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Product} from '../models/data/product';
import {Observable} from 'rxjs/Observable';
import {ProductListResponse} from '../models/response-models/product-list-response';

@Injectable()
export class ProductService extends BaseService{

  constructor(private httpClient: HttpClient) { super(); }

  addProduct(productFormValues) {
    let params = new HttpParams()
      .set('name', productFormValues.name)
      .set('categoryId', productFormValues.categoryId)
      .set('weight', productFormValues.weight)
      .set('weightUnit', productFormValues.weightUnit)
      .set('imageToken', productFormValues.imageToken)
      .set('barcode', productFormValues.barcode);
    return this.httpClient.post<Product>(this.authApiUrl + '/api/product/create', params);
  }

  public getPaginatedProducts(limit: number, offset: number): Observable<ProductListResponse>{
    return this.httpClient.get<ProductListResponse>(this.authApiUrl + '	/api/product/get-all/' + limit + '/' + offset);
  }

}
