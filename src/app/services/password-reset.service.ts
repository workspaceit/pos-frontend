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

  public resetPassword(password: string, confirmPassword: string, token: string): Observable<PasswordResetResponse> {
    let params = new HttpParams().set('password', password).set('confirmPassword', confirmPassword).set('token', token);
    return this.httpClient.post<PasswordResetResponse>(this.apiUrl + '/reset-password/submit', params);
  }

}
