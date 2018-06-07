import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {EmployeeService} from '../../../../services/employee.service';
import {ValidatorUtil} from '../../../../util/validator-util';
import {GrowlUtil} from '../../../../util/growl-util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css'],
  providers: [EmployeeService]
})
export class EmployeeAddComponent implements OnInit {

  employeeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService, private router: Router) { }

  ngOnInit() {
    const thisComponent = this;
    this.createEmployeeForm();
    (<any>$('#dob')).datepicker({
      dateFormat: 'dd-mm-yy'
    }).on('change', function () {
      console.log('changed');
      thisComponent.employeeForm.controls['personalInfo.dob'].setValue((<any>$)(this).val());
    });
  }

  createEmployeeForm() {
    this.employeeForm = this.formBuilder.group({
      'employeeId': [''],
      'salary': [''],
      'type': ['ADMIN', Validators.required],

      'personalInfo.fullName': ['', Validators.required],
      'personalInfo.address': [''],
      'personalInfo.email': [''],
      'personalInfo.dob': [''],
      'personalInfo.phone': [''],

      'authCredential.email': ['', Validators.required],
      'authCredential.password': ['', Validators.required],
      'authCredential.confirmPassword': ['', Validators.required]
    });

    console.log(this.employeeForm.controls);
  }

  addEmployee() {
    console.log(this.employeeForm.value);
    this.employeeService.createEmployee(this.employeeForm.value).subscribe(
      employee => {
        GrowlUtil.notify({type:'notice', title: 'Success', message: 'Employee created'});
      },
      error => {
        console.log(error);
        ValidatorUtil.bindValidationError(error.error, this.employeeForm);
      }
    );
  }

}
