import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Category} from '../models/data/category';

@Injectable()
export class CategoryService extends BaseService {

  constructor(private httpClient: HttpClient) { super(); }

  getCategories() {
    return this.httpClient.get<Category[]>(this.apiUrl + '/category/get-all');
  }

}
