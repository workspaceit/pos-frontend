import { Component, OnInit } from '@angular/core';
import {LoginService} from '../../../services/login.service';
import {Router} from '@angular/router';
import {GrowlUtil} from '../../../util/growl-util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [LoginService]
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private loginService: LoginService, private router: Router) {
    this.username = '';
    this.password = '';
  }

  ngOnInit() {

  }

  login() {
    this.loginService.authenticate(this.username, this.password).subscribe(
      (oAuthCredential)=> {
        this.router.navigate(['admin/dashboard']);
      },
      error => {
        GrowlUtil.notify({type:'error', title:'Error!' , message: error.error.error_description});
        console.log(error.error.error_description);
      });
  }

}
