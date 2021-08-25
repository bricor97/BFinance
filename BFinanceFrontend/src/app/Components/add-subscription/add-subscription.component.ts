import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GetAccount } from '../../Models/account';
import { PostSubscription } from '../../Models/subscription';
import { AccountService } from '../../Services/account.service';
import { ExpenseService } from '../../Services/expense.service';

@Component({
  selector: 'app-add-subscription',
  templateUrl: './add-subscription.component.html',
  styleUrls: ['./add-subscription.component.css']
})
export class AddSubscriptionComponent implements OnInit {

  name: string          = '';
  amount?: number;
  period: string        = '';
  dueMonth: string      = '';
  dueDay: string        = '';
  fromAccountId: number = 0;

  accounts!: GetAccount[];

  @Output() formSubmit: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _expenseService: ExpenseService, private _accountService: AccountService) { }

  ngOnInit(): void {
    this._accountService.getAllAcounts().subscribe(
      accounts => this.accounts = accounts
    );
  }

  onSubmit(): void {
    let newSubscription: PostSubscription = {
      subscriptionName: this.name,
      paymentAmount:    this.amount!,
      paymentPeriod:    this.period,
      paymentDueDate:   this.dueMonth == '' ? this.dueDay : this.dueMonth + '/' + this.dueDay,
      fromAccountId:    this.fromAccountId
    }
    this.name          = '';
    this.amount        = undefined;
    this.period        = '';
    this.dueMonth      = '';
    this.dueDay        = '';
    this.fromAccountId = 0;
    this._expenseService.addSubscription(newSubscription).subscribe(
      next => { }, error => { }, () => { this.formSubmit.emit("Subscription successfully added"); }
    );
  }
}
