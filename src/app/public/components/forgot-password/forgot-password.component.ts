import { Component, OnInit } from '@angular/core';
import {PasswordResetService} from '../../../services/password-reset.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {GrowlUtil} from '../../../util/growl-util';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
  providers: [PasswordResetService]
})
export class ForgotPasswordComponent implements OnInit {

  forgotPasswordForm: FormGroup =new FormGroup({
    email: new FormControl([],[Validators.required, Validators.email])
  });

  constructor(private passwordResetService: PasswordResetService) {
    console.log(this.forgotPasswordForm.controls.email);
  }

  ngOnInit() {
  }

  getPasswordResetLink(){
    this.passwordResetService.passwordResetRequest(this.forgotPasswordForm.value.email).subscribe(
      (data) =>  {
        GrowlUtil.notify('notice', 'Success', data.msg)
      },
      (error) =>  {
        this.forgotPasswordForm.controls.email.setErrors({'errorMsg': error.error[0].msg});
        console.log(error.error[0].msg);
      }
    );
  }

}
