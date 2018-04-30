import {Address} from './address';
import {COMPANY_ROLE} from './company-role.enum';

export class PersonalInformation {

  id: number;
  fullName: string;
  dob: Date;
  email: string;
  phone: string;
  companyRoles: COMPANY_ROLE[];
  address: Address = new Address();
  createdAt: Date;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
