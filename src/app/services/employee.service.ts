import { Injectable } from '@angular/core';
import {BaseService} from './base.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Employee} from '../models/data/employee';
import * as moment from 'moment';

@Injectable()
export class EmployeeService extends BaseService{

  constructor(private httpClient: HttpClient) {
    super();
  }

  public createEmployee(employeeValues): Observable<Employee> {
    let params = new HttpParams()
      .set('authCredential.email',employeeValues['authCredential.email'])
      .set('authCredential.password', employeeValues['authCredential.password'])
      .set('authCredential.confirmPassword', employeeValues['authCredential.confirmPassword'])
      .set('authCredential.accessRole', employeeValues['authCredential.accessRole'])

      .set('personalInfo.fullName', employeeValues['personalInfo.fullName'])
      .set('personalInfo.dob', moment(employeeValues['personalInfo.dob'], 'DD-MM-YYYY').format('MM/DD/YYYY'))
      .set('personalInfo.email', employeeValues['personalInfo.email'])
      .set('personalInfo.address', employeeValues['personalInfo.address'])

      .set('employeeId', employeeValues.employeeId)
      .set('salary', employeeValues.salary);

    return this.httpClient.post<Employee>(this.authApiUrl + '/api/employee/create', params);
  }

  public getEmployees(): Observable<Employee[]>{
      return this.httpClient.get<Employee[]>(this.authApiUrl + '	/api/employee/get-all');
  }

}
