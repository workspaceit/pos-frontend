import { Injectable } from '@angular/core';
import {OAuthCredential} from '../models/oauth-credential';

@Injectable()
export class AuthService {

  private currentUserKey = 'dccPos';
  private oAuthCredentialKey = 'dccPosOauthCredential';


  constructor() { }

  isLoggedIn() {
    return this.getLocalOAuthCredential() != null;
  }

  public getLocalUserDetails() {
    return JSON.parse(localStorage.getItem(this.currentUserKey));
  }

  public getLocalOAuthCredential() {
    return JSON.parse(localStorage.getItem(this.oAuthCredentialKey));
  }

  public setLocalUserDetails() {

  }

  public setLocalOAuthCredential(oAuthCredential: OAuthCredential) {
    localStorage.setItem(this.oAuthCredentialKey, JSON.stringify(oAuthCredential));
  }

  public removeLocalOAuthCredential() {
    localStorage.removeItem(this.oAuthCredentialKey);
  }

  public removeLocalUserDetails() {
    localStorage.removeItem(this.currentUserKey);
  }

  public removeLocalData() {
    this.removeLocalUserDetails();
    this.removeLocalOAuthCredential();
  }

}
