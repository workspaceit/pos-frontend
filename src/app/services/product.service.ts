import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Product} from '../models/data/product';
import {Observable} from 'rxjs/Observable';
import {ProductListResponse} from '../models/response-models/product-list-response';
import {ProductSearchForm} from '../models/form/product/product-search-form';

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


















  public getProductsBySearchCriteria(limit: number, offset: number, productSearchForm:ProductSearchForm): Observable<ProductListResponse>{
    let searchParam = '?';
    if(productSearchForm.name!==''){
      searchParam +='name='+productSearchForm.name;
    }
    if(productSearchForm.categoryId>0){
      searchParam +='&';
      searchParam +='categoryId='+productSearchForm.categoryId;
    }
    return this.httpClient.get<ProductListResponse>(this.authApiUrl + '	/api/product/get-all/' + limit + '/' + offset+searchParam);
  }
}
