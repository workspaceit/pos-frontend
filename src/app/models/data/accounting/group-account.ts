import {GROUP_CODE} from '../../constant/GROUP_CODE';

export class GroupAccount{
  id:number;
  parentId:number;
  child:GroupAccount;
  name:string;
  code:GROUP_CODE;
  affectsGross:boolean;
}
