import {PersonalInformation} from './personal-information';

export class Consumer{
  public consumerId:string;
  public personalInformation:PersonalInformation;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}
