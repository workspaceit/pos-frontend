import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountListComponent } from './components/account-list/account-list.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { LedgerAddComponent } from './components/ledger-add/ledger-add.component';
import { PaymentAddComponent } from './components/payment-add/payment-add.component';
import { PaymentComponent } from './components/payment/payment.component';

@NgModule({
  imports: [
    CommonModule,
    AccountsRoutingModule
  ],
  declarations: [AccountListComponent, InvoiceComponent, LedgerAddComponent, PaymentAddComponent, PaymentComponent]
})
export class AccountsModule { }
