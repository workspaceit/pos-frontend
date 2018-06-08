import { Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs/Observable';
import {Ledger} from '../models/data/accounting/ledger';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class LedgerService extends BaseService {
  constructor(private httpClient: HttpClient, private authService: AuthService) {
    super();
  }
  public getBankOrCashAccount():Observable<Ledger[]>{
    return this.httpClient.get<Ledger[]>(this.authApiUrl + '/api/ledger/get/bankOrCash');
  }
}