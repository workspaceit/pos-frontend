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

  public getProductById(productId: number): Observable<Product>{
    return this.httpClient.get<Product>(this.authApiUrl + '/api/product/get/' + productId);
  }
  public getProductByBarCode(barCode: number): Observable<Product>{
    return this.httpClient.get<Product>(this.authApiUrl + '/api/product/get-by-barcode?barcode=' + barCode);
  }
  public updateProduct(productValues, productId): Observable<Product> {
    let params = new HttpParams()
      .set('name', productValues['name'])
      .set('imageToken', productValues['imageToken'])
      .set('weight', productValues['weight'])
      .set('weightUnit', productValues['weightUnit'])
      .set('barcode', productValues['barcode']);


    if(productValues['categoryId']!=null && productValues['categoryId']>0){
      params =  params.set('categoryId', productValues['categoryId']);
    }
    return this.httpClient.post<Product>(this.authApiUrl + '/api/product/update/' + productId, params);
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
