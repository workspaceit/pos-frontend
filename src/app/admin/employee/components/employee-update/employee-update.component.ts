import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmployeeService} from '../../../../services/employee.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Employee} from '../../../../models/data/employee';
import * as moment from 'moment';
import {ValidatorUtil} from '../../../../util/validator-util';
import {GrowlUtil} from '../../../../util/growl-util';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css'],
  providers: [EmployeeService]
})
export class EmployeeUpdateComponent implements OnInit {

  employeeForm: FormGroup;
  employeeId: number;
  employee: Employee = new Employee();

  constructor(private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute, private employeeService: EmployeeService,
              private router: Router) { }

  ngOnInit() {

    this.createEmployeeForm();

    this.activatedRoute.params.subscribe(
      params => {
        this.employeeId = params['employeeId'];
        console.log(this.employeeId);
        this.getEmployee();

      }
    );
  }

  createEmployeeForm() {
    let dob: string | Date = '';
    dob = this.employee.personalInformation.dob != null?
      moment(this.employee.personalInformation.dob, 'YYYY-MM-DD').format('DD-MM-YYYY'): '';
    this.employeeForm = this.formBuilder.group({
      'employeeId': [this.employee.employeeId],
      'salary': [this.employee.salary],

      'personalInfo.fullName': [this.employee.personalInformation.fullName, Validators.required],
      'personalInfo.address': [this.employee.personalInformation.address.formattedAddress],
      'personalInfo.dob': [dob],

      'type': [this.employee.type, Validators.required]
    });
  }

  getEmployee(){
    const thisComponent = this;
    this.employeeService.getEmployeeById(this.employeeId).subscribe(
      employee => {
        this.employee = employee;
        this.createEmployeeForm();
        (<any>$('#dob')).datepicker({
          dateFormat: 'dd-mm-yy'
        }).on('change', function () {
          thisComponent.employeeForm.controls['personalInfo.dob'].setValue((<any>$)(this).val());
        });
      },
      error => {

      }
    );
  }

  updateEmployee(){
    let dob: string | Date = '';
    console.log(this.employeeForm.value);
    dob = this.employeeForm.value['personalInfo.dob'] !== ''?
      moment(this.employeeForm.value['personalInfo.dob'], 'DD-MM-YYYY').format('MM/DD/YYYY'): '';
    this.employeeForm.value['personalInfo.dob'] = dob;
    this.employeeService.updateEmployee(this.employeeForm.value, this.employeeId).subscribe(
      data => {
        GrowlUtil.notifyAndNavigate({type:'notice', title: 'Success', message: 'Employee updated'}, '/admin/employee/list',
          this.router);
      },error => { ValidatorUtil.bindValidationError(error.error, this.employeeForm); }
    );
  }

}