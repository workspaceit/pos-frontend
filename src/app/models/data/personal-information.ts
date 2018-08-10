import {Address} from './address';
import {COMPANY_ROLE} from '../constant/company-role.enum';
import {AuthCredential} from './authCredential';

export class PersonalInformation {

  id: number;
  fullName: string;
  dob: Date;
  email: string;
  phone: string;
  companyRoles: COMPANY_ROLE[];
  authCredential: AuthCredential = new AuthCredential();
  address: Address = new Address();
  createdAt: Date;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }

}
