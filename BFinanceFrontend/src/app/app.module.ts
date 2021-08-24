import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { SeeAccountsComponent } from './Components/see-accounts/see-accounts.component';
import { AddAccountComponent } from './Components/add-account/add-account.component';
import { SeeExpensesComponent } from './Components/see-expenses/see-expenses.component';
import { SeeBillsComponent } from './Components/see-bills/see-bills.component';
import { SeeSubscriptionsComponent } from './Components/see-subscriptions/see-subscriptions.component';
import { SeeAutoTransfersComponent } from './Components/see-auto-transfers/see-auto-transfers.component';
import { SeeCalendarComponent } from './Components/see-calendar/see-calendar.component';
import { EditAccountComponent } from './Components/edit-account/edit-account.component';
import { AddSubscriptionComponent } from './Components/add-subscription/add-subscription.component';
import { AddAutoTransferComponent } from './Components/add-auto-transfer/add-auto-transfer.component';
import { AddBillComponent } from './Components/add-bill/add-bill.component';
import { UniDatePipePipe } from './uni-date-pipe.pipe';

@NgModule({
  declarations: [
    AppComponent,
    SeeAccountsComponent,
    AddAccountComponent,
    SeeExpensesComponent,
    SeeBillsComponent,
    SeeSubscriptionsComponent,
    SeeAutoTransfersComponent,
    SeeCalendarComponent,
    EditAccountComponent,
    AddSubscriptionComponent,
    AddAutoTransferComponent,
    AddBillComponent,
    UniDatePipePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule, RouterModule,
    HttpClientModule,
    FormsModule, ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
