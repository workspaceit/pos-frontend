import {FormGroup} from '@angular/forms';

export class ValidatorUtil {

  public static bindValidationError(errors, form: FormGroup) {
    for(let er of errors){
      const param = er.params;
      const msg = er.msg;
      if(form.controls[param]){
        form.controls[param].setErrors({[param]: msg});
      }
    }

  }
}
