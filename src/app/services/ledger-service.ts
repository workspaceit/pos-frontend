import { Injectable} from '@angular/core';
import {BaseService} from './base.service';
import {Observable} from 'rxjs/Observable';
import {Ledger} from '../models/data/accounting/ledger';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {LedgerListResponse} from '../models/response-models/ledger-list-response';
import {PaymentCreateForm} from '../models/form/payment-create-form';
import {InvestmentCreateForm} from '../models/form/investment-create-form';

@Injectable()
export class LedgerService extends BaseService {
  constructor(private httpClient: HttpClient, private authService: AuthService) {
    super();
  }
  public getBankOrCashAccount():Observable<Ledger[]>{
    return this.httpClient.get<Ledger[]>(this.authApiUrl + '/api/ledger/get/bankOrCash');
  }
  public getAll(limit: number, offset: number):Observable<any> {

    return this.httpClient.get<any>(this.authApiUrl + '/api/ledger/get-all');
  }
  public getLedgerDetailsByType(ledgerType: string):Observable<Ledger[]>{
    return this.httpClient.get<Ledger[]>(this.authApiUrl + '/api/ledger/get/' + ledgerType);
  }
  public createPayment(paymentCreateForm: PaymentCreateForm)
  {
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.httpClient.post<any>(this.authApiUrl + '/api/entry/make/payment',JSON.stringify(paymentCreateForm),options);
  }
  public createReceipt(paymentCreateForm: PaymentCreateForm)
  {
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.httpClient.post<any>(this.authApiUrl + '/api/entry/make/receipt',JSON.stringify(paymentCreateForm),options);
  }
  public makeInvestment(investmentCreateForm: InvestmentCreateForm)
  {
    const options = {headers: {'Content-Type': 'application/json'}};
    return this.httpClient.post<any>(this.authApiUrl + '/api/entry/make/investment/cash',JSON.stringify(investmentCreateForm),options);
  }
}
