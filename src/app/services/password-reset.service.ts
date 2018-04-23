import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BaseService} from './base.service';
import {PasswordResetResponse} from '../models/response-models/password-reset-response';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class PasswordResetService extends BaseService {

  constructor(private httpClient: HttpClient) {
    super();
  }

  public passwordResetRequest(emailOrUsername: string): Observable<PasswordResetResponse> {
    // console.log(this.httpClient);
    let params = new HttpParams().set('email',emailOrUsername);
    return this.httpClient.post<PasswordResetResponse>(this.apiUrl + '/reset-password/request-new', params);
  }

}
