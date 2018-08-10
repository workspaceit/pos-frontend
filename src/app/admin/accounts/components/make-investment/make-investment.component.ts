import { Component, OnInit } from '@angular/core';
import {LedgerService} from '../../../../services/ledger-service';
import {Ledger} from '../../../../models/data/accounting/ledger';
import {PaymentCreateForm} from '../../../../models/form/payment-create-form';
import {PaymentLedgerForm} from '../../../../models/form/payment-ledger-form';
import {InvestmentCreateForm} from '../../../../models/form/investment-create-form';
import {GrowlUtil} from '../../../../util/growl-util';
import {Router} from '@angular/router';

@Component({
  selector: 'app-make-investment',
  templateUrl: './make-investment.component.html',
  styleUrls: ['./make-investment.component.css'],
  providers: [LedgerService]
})
export class MakeInvestmentComponent implements OnInit {

  bankOrCash: Ledger[] = [];
  beneficialAccount: Ledger[] = [];
  protected errors=[];

  protected investmentCreateForm: InvestmentCreateForm = new InvestmentCreateForm();

  constructor(private ledgerService: LedgerService,private router: Router) {
    this.investmentCreateForm.cashOrBank = [];
    const paymentLedgerForm:PaymentLedgerForm = new PaymentLedgerForm();
    paymentLedgerForm.amount=null;
    paymentLedgerForm.ledgerId=0;

    this.investmentCreateForm.cashOrBank.push(paymentLedgerForm);
  }

  ngOnInit() {
    const componentRef = this;
    (<any>$('#saleDate')).datepicker({
      dateFormat: 'yy-mm-dd'
    }).on('change', function () {
      console.log('changed');
      componentRef.investmentCreateForm.date = (<any>$)(this).val();
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

    this.investmentCreateForm.cashOrBank.push(paymentAccount);
  }
  public removePaymentAccount(index:number){
    this.investmentCreateForm.cashOrBank.splice(index,1);
  }

  public getTotalDrAmount()
  {
    let totalDr = 0;
    for (const totalAmount of this.investmentCreateForm.cashOrBank)
    {
      if(isNaN(totalAmount.amount))
      {
        continue;
      }

      totalDr+= totalAmount.amount;
    }
    return totalDr;
  }

  public submitInvestment()
  {
    this.errors = [];
    this.ledgerService.makeInvestment(this.investmentCreateForm).subscribe((data)=>{
      GrowlUtil.notify({type:'notice', title: 'Success', message: 'Investment Added'});
      setTimeout(function () {
        location.reload();
      },1500);

    },(error)=>{
      this.errors= error.error;
    });
  }

}
