import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {PasswordResetService} from '../../../services/password-reset.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
  providers: [PasswordResetService]
})
export class ResetPasswordComponent implements OnInit {

  token: string;
  resetPasswordForm: FormGroup;
  resetSuccessful = false;

  constructor(private route: ActivatedRoute, private passwordResetService: PasswordResetService, private router: Router) { }

  ngOnInit() {

    this.resetPasswordForm = new FormGroup({
      password: new FormControl([], [Validators.required]),
      confirmPassword: new FormControl([], [Validators.required]),
      token: new FormControl(this.token, [])
    });

    this.route.params.subscribe(params => {
      this.token = params['token'];
    });
  }

  reset(){
    const thisComponent = this;
    // console.log(this.resetPasswordForm.value);
    this.passwordResetService.resetPassword(this.resetPasswordForm.value.password, this.resetPasswordForm.value.confirmPassword,
      this.token).subscribe(
      data => {
        this.resetSuccessful = true;
        setTimeout(function(){
          thisComponent.router.navigate(['/login']);
        }, 2000);
      },
      error => {
        let errors = error.error;
        console.log(errors);
        for(let er of errors){
          const param = er.params;
          const msg = er.msg;
          if(this.resetPasswordForm.controls[param]){
            thisComponent.resetPasswordForm.controls[param].setErrors({[param]: msg});
          }
        }
        console.log(this.resetPasswordForm.controls);
      }
    );
  }


}
