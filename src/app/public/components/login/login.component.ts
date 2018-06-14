import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../../services/login.service';
import {ActivatedRoute, Router} from '@angular/router';
import {GrowlUtil} from '../../../util/growl-util';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private loginService: LoginService, private router: Router, private route: ActivatedRoute,
    private authService: AuthService) {
    this.username = '';
    this.password = '';
    if(this.authService.isLoggedIn()){
      this.router.navigate(['admin/dashboard']).then();
    }
  }

  ngOnInit() {

  }

  login() {
    this.loginService.authenticate(this.username, this.password).subscribe(
      (oAuthCredential)=> {
        /*const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        if(returnUrl !== '/'){
          this.router.navigate([returnUrl]);
        }
        else {
          this.router.navigate(['admin/dashboard']);
        }*/

        this.router.navigate(['admin/dashboard']);
      },
      error => {
        GrowlUtil.notify({type:'error', title:'Error!' , message: error.error.error_description});
        console.log(error.error.error_description);
      });
  }

}
