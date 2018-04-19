import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {OAuthCredential} from '../models/oauth-credential';
import {HttpClient, HttpParams} from '@angular/common/http';
import {BaseService} from './base.service';
import {tap} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable()
export class LoginService extends BaseService {

  private clientId = 'pos-app-client';
  private clientSecret = 'f6c3d96bc05036e738f0899ba149f447924b3a09';

  constructor(private httpClient: HttpClient, private authService: AuthService) {
    super();
  }

  public authenticate(emailOrUsername: string,password: string): Observable<OAuthCredential> {
    let params = new HttpParams().set('username',emailOrUsername);
    params = params.set('password',password);
    params = params.set('client_id',this.clientId);
    params = params.set('client_secret',this.clientSecret);
    params = params.set('grant_type','password');
    return this.httpClient.post<OAuthCredential>(this.apiUrl + '/oauth/token', params).pipe(tap(
        oAuthCredential => {
          console.log(oAuthCredential);
          this.authService.setLocalOAuthCredential(oAuthCredential);
        },
        error => {}
      )
    );
  }

}
