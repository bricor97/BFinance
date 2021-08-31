import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SeeAccountsComponent } from './Components/see-accounts/see-accounts.component';
import { SeeExpensesComponent } from './Components/see-expenses/see-expenses.component';
import { SeeBillsComponent } from './Components/see-bills/see-bills.component';
import { SeeSubscriptionsComponent } from './Components/see-subscriptions/see-subscriptions.component';
import { SeeAutoTransfersComponent } from './Components/see-auto-transfers/see-auto-transfers.component';
import { SeeCalendarComponent } from './Components/see-calendar/see-calendar.component';
import { SeeToolsComponent } from './Components/see-tools/see-tools.component';
import { AddAccountComponent } from './Components/add-account/add-account.component';
import { AddBillComponent } from './Components/add-bill/add-bill.component';
import { AddSubscriptionComponent } from './Components/add-subscription/add-subscription.component';
import { AddAutoTransferComponent } from './Components/add-auto-transfer/add-auto-transfer.component';

const appRoutes: Routes = [
  { path: '', component: SeeAccountsComponent },
  { path: 'Accounts', component: SeeAccountsComponent },
  { path: 'Account/AddAccount', component: AddAccountComponent },
  { path: 'Expenses', component: SeeExpensesComponent },
  //{ path: 'Expense/Bills', component: SeeBillsComponent },
  { path: 'Expense/AddBill', component: AddBillComponent },
  //{ path: 'Expense/Subscriptions', component: SeeSubscriptionsComponent },
  { path: 'Expense/AddSubscription', component: AddSubscriptionComponent },
  //{ path: 'Expense/AutoTransfers', component: SeeAutoTransfersComponent },
  { path: 'Expense/AddAutoTransfer', component: AddAutoTransferComponent },
  { path: 'Calendar', component: SeeCalendarComponent },
  { path: 'Tools', component: SeeToolsComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
