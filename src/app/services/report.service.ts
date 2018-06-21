import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {ProfitAndLossReport} from '../models/data/report/profit-and-loss-report';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CategoryService extends BaseService {

  constructor(private httpClient: HttpClient) { super(); }

  public getProfitAndLoss(startDate:string, finishDate:string):Observable<ProfitAndLossReport> {
    return this.httpClient.get<ProfitAndLossReport>(this.authApiUrl + '/api/report/get-profit-and-loss/'+startDate+'/'+finishDate);
  }

}
