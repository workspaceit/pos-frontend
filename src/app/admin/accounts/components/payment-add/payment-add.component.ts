import { Component, OnInit } from '@angular/core';
import { LEDGER_SEARCH_TYPE} from '../../../../models/constant/LEDGER_SEARCH_TYPE';
import {LedgerService} from '../../../../services/ledger-service';
import {Ledger} from '../../../../models/data/accounting/ledger';
import {PaymentCreateForm} from '../../../../models/form/payment-create-form';
import {PaymentLedgerForm} from '../../../../models/form/payment-ledger-form';

@Component({
  selector: 'app-payment-add',
  templateUrl: './payment-add.component.html',
  styleUrls: ['./payment-add.component.css'],
  providers: [LedgerService]
})
export class PaymentAddComponent implements OnInit {


  bankOrCash: Ledger[] = [];
  beneficialAccount: Ledger[] = [];
  protected paymentCreateForm: PaymentCreateForm = new PaymentCreateForm();


  constructor(private ledgerService: LedgerService) {
    this.paymentCreateForm.cashOrBank = [];
    const paymentLedgerForm:PaymentLedgerForm = new PaymentLedgerForm();
    paymentLedgerForm.amount=null;
    paymentLedgerForm.ledgerId=0;

    this.paymentCreateForm.cashOrBank.push(paymentLedgerForm);
  }

  ngOnInit() {
    const componentRef = this;
    (<any>$('#saleDate')).datepicker({
      dateFormat: 'yy-mm-dd'
    }).on('change', function () {
      console.log('changed');
      componentRef.paymentCreateForm.date = (<any>$)(this).val();
    });
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
  public addPaymentAccount(){
    const paymentAccount: PaymentLedgerForm = new PaymentLedgerForm();
    paymentAccount.ledgerId = 0;

    this.paymentCreateForm.cashOrBank.push(paymentAccount);
  }
  public removePaymentAccount(index:number){
    this.paymentCreateForm.cashOrBank.splice(index,1);
  }

  public getTotalDrAmount()
  {
    let totalDr = 0;
    for (const totalAmount of this.paymentCreateForm.cashOrBank)
    {
      if(isNaN(totalAmount.amount))
      {
        continue;
      }

      totalDr+= totalAmount.amount;
    }
    return totalDr;
  }

  public submitPayment()
  {
    this.ledgerService.createPayment(this.paymentCreateForm).subscribe((data)=>{
      console.log(data);
    });
  }


}
