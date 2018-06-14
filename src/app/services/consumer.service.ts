import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Consumer} from '../models/data/consumer';
import {ConsumerForm} from '../models/form/consumer-form';

@Injectable()
export class ConsumerService extends BaseService{

  constructor(private httpClient: HttpClient) {
    super();
  }

  public getByAll(): Observable<Consumer[]>{
    return this.httpClient.get<Consumer[]>(this.authApiUrl + '/api/consumer/get-all');
  }
  public getNewForml(): Observable<ConsumerForm>{
    return this.httpClient.get<ConsumerForm>(this.authApiUrl + '/api/consumer/get-new-consumer-form');
  }

}
