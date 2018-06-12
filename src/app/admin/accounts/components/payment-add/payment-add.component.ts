import { Component, OnInit } from '@angular/core';
import { LEDGER_SEARCH_TYPE} from '../../../../models/constant/LEDGER_SEARCH_TYPE';
import {LedgerService} from '../../../../services/ledger-service';
import {Ledger} from '../../../../models/data/accounting/ledger';

@Component({
  selector: 'app-payment-add',
  templateUrl: './payment-add.component.html',
  styleUrls: ['./payment-add.component.css'],
  providers: [LedgerService]
})
export class PaymentAddComponent implements OnInit {


  bankOrCash: Ledger[] = [];
  beneficialAccount: Ledger[] = [];

  constructor(private ledgerService: LedgerService) { }

  ngOnInit() {
    this.getBankOrCash();
    this.getSupplier();
  }
  getBankOrCash(){
    this.ledgerService.getLedgerDetailsByType('bankOrCash').subscribe(
      bank=> {
        this.bankOrCash = bank;
        console.log(this.bankOrCash);
      }
    );
  }
  getSupplier()
  {
    this.ledgerService.getLedgerDetailsByType('supplier').subscribe(
      beneficial=> {
        this.beneficialAccount = beneficial;
        console.log(this.beneficialAccount);
      }
    );
  }


}
