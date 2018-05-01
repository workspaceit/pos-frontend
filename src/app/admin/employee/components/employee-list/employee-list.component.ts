import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../../../../services/employee.service';
import {Employee} from '../../../../models/data/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
  providers: [EmployeeService]
})
export class EmployeeListComponent implements OnInit {

  type = 'all';
  employees: Employee[];

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    if(this.type === 'all') {
      this.employeeService.getEmployees().subscribe(
        data => {
          this.employees = data;
        },
        error => {

        }
      );
    }
    else {
      this.employeeService.getEmployeesByType(this.type).subscribe(
        data => {
          this.employees = data;
        },
        error => {

        }
      );
    }
  }

  typeChanged(event) {
    this.getEmployees();
  }

}
