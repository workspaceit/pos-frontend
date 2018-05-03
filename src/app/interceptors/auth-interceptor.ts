import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('auth interceptor');
    let authReq: HttpRequest<any>;
    if(req.url.includes('auth')){
      authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + this.authService.getLocalOAuthCredential().access_token)
      });
    }
    else {
      authReq = req.clone();
    }
    return next.handle(authReq).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        console.log(err);
        if (err.status === 401) {
          this.authService.removeLocalData();
          this.router.navigate(['/login']);
        }
      }
    });
  }
}
