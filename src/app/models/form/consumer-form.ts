import {PersonalInfoForm} from './personal-info-form';

export class ConsumerForm{
  public consumerId:string=null;
  public personalInfo:PersonalInfoForm;
  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
