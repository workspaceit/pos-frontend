import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountListComponent} from './components/account-list/account-list.component';
import {PaymentComponent} from './components/payment/payment.component';
import {PaymentAddComponent} from './components/payment-add/payment-add.component';
import {InvoiceComponent} from './components/invoice/invoice.component';
import {LedgerAddComponent} from './components/ledger-add/ledger-add.component';

const routes: Routes = [
  { path: 'list', component: AccountListComponent },
  { path: 'add-ledger', component: LedgerAddComponent },
  { path: 'invoice/:invoiceFor/:invoiceTypeId', component: InvoiceComponent },
  { path: 'add-payment', component: PaymentAddComponent },
  { path: 'payment', component: PaymentComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
