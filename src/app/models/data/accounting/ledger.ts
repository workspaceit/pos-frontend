import {PersonalInformation} from '../personal-information';
import {Company} from '../company';
import {GroupAccount} from './group-account';
import {ACCOUNTING_ENTRY} from '../../constant/ACCOUNTING_ENTRY';
import {LEDGER_TYPE} from '../../constant/LEDGER_TYPE';

export class Ledger{
  id:number;
  groupAccount: GroupAccount;
  personalInformation:PersonalInformation;
  company:Company;
  name:string;
  openingBalance:number;
  openingBalanceEntryType:ACCOUNTING_ENTRY;
  currentBalance:number;
  currentBalanceEntryType:ACCOUNTING_ENTRY;
  ledgerType:LEDGER_TYPE;
  reconciliation:number;
  notes:string;
}
