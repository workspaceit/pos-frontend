import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AccountListComponent} from './components/account-list/account-list.component';
import {PaymentComponent} from './components/payment/payment.component';
import {PaymentAddComponent} from './components/payment-add/payment-add.component';
import {InvoiceComponent} from './components/invoice/invoice.component';
import {LedgerAddComponent} from './components/ledger-add/ledger-add.component';
import {LedgerListComponent} from './components/ledger-list/ledger-list.component';
import {ProfitAndLossComponent} from './components/profit-and-loss/profit-and-loss.component';
import {BalanceSheetComponent} from './components/balance-sheet/balance-sheet.component';

const routes: Routes = [
  { path: 'list', component: AccountListComponent },
  { path: 'add-ledger', component: LedgerAddComponent },
  { path: 'invoice/:invoiceFor/:respectiveId', component: InvoiceComponent },
  { path: 'add-payment', component: PaymentAddComponent },
  { path: 'payment', component: PaymentComponent },
  { path: 'ledger-list' ,component: LedgerListComponent},
  { path: 'profit-and-loss' ,component: ProfitAndLossComponent},
  { path: 'balance-sheet' ,component: BalanceSheetComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountsRoutingModule { }
