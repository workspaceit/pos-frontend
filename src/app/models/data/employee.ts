import {PersonalInformation} from './personal-information';

export class Employee {
  id: number;
  personalInformation: PersonalInformation = new PersonalInformation();
  employeeId: string;
  salary: number;
  createdAt: Date;
  type: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
