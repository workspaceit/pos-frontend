import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient} from '@angular/common/http';
import {ProfitAndLossReport} from '../models/data/report/profit-and-loss-report';
import {Observable} from 'rxjs/Observable';
import {BalanceSheetReport} from '../models/data/report/balance-sheet-report';

@Injectable()
export class ReportService extends BaseService {

  constructor(private httpClient: HttpClient) { super(); }

  public getProfitAndLoss(startDate:string, finishDate:string):Observable<ProfitAndLossReport> {
    let params = '?';
    if(startDate!==null && startDate!==''){
      params+='startDate='+startDate;
    }

    if(finishDate!==null && finishDate!==''){
      params+='&finishDate='+finishDate;

    }
    return this.httpClient.get<ProfitAndLossReport>(this.authApiUrl + '/api/report/get-profit-and-loss'+params);
  }
  public getBalanceSheet(startDate:string, finishDate:string):Observable<BalanceSheetReport> {
    let params = '?';
    if(startDate!==null && startDate!==''){
      params+='startDate='+startDate;
    }

    if(finishDate!==null && finishDate!==''){
      params+='&finishDate='+finishDate;

    }
    return this.httpClient.get<BalanceSheetReport>(this.authApiUrl + '/api/report/get-balance-sheet'+params);
  }
}
