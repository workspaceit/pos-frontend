import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountsRoutingModule } from './accounts-routing.module';
import { AccountListComponent } from './components/account-list/account-list.component';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { LedgerAddComponent } from './components/ledger-add/ledger-add.component';
import { PaymentAddComponent } from './components/payment-add/payment-add.component';
import { PaymentComponent } from './components/payment/payment.component';
import { LedgerListComponent } from './components/ledger-list/ledger-list.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ProfitAndLossComponent } from './components/profit-and-loss/profit-and-loss.component';
import { ReportRowComponent } from './components/report-row/report-row.component';

@NgModule({
  imports: [
    CommonModule,
    AccountsRoutingModule,
    NgxPaginationModule
  ],
  declarations: [AccountListComponent, InvoiceComponent, LedgerAddComponent, PaymentAddComponent, PaymentComponent, LedgerListComponent, ProfitAndLossComponent, ReportRowComponent]
})
export class AccountsModule { }
