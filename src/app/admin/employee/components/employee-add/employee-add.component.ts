import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {EmployeeService} from '../../../../services/employee.service';
import {ValidatorUtil} from '../../../../util/validator-util';
import {GrowlUtil} from '../../../../util/growl-util';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css'],
  providers: [EmployeeService]
})
export class EmployeeAddComponent implements OnInit {

  employeeForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.createEmployeeForm();
  }

  createEmployeeForm() {
    this.employeeForm = this.formBuilder.group({
      'employeeId': [''],
      'salary': [''],

      'personalInfo.fullName': ['', Validators.required],
      'personalInfo.address': [''],
      'personalInfo.email': [''],
      'personalInfo.dob': [''],

      'authCredential.email': ['', Validators.required],
      'authCredential.password': ['', Validators.required],
      'authCredential.confirmPassword': ['', Validators.required],
      'authCredential.accessRole': ['ADMIN', Validators.required]
    });

    console.log(this.employeeForm.controls);
  }

  addEmployee() {
    console.log(this.employeeForm.value);
    this.employeeService.createEmployee(this.employeeForm.value).subscribe(
      employee => {
        console.log('hi there');
        GrowlUtil.notify('notice', 'Success', 'Employee Created');
      },
      error => {
        console.log(error);
        ValidatorUtil.bindValidationError(error.error, this.employeeForm);
      }
    );
  }

}
