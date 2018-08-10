export class PersonalInfoForm{
  public fullName:string;
  public dob:string;
  public email:string;
  public phone:string;
  public address:string;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
