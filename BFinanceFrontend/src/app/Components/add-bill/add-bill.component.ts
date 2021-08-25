import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { GetAccount } from '../../Models/account';
import { PostBill } from '../../Models/bill';
import { AccountService } from '../../Services/account.service';
import { ExpenseService } from '../../Services/expense.service';

@Component({
  selector: 'app-add-bill',
  templateUrl: './add-bill.component.html',
  styleUrls: ['./add-bill.component.css']
})
export class AddBillComponent implements OnInit {

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
    let newBill: PostBill = {
      billName:       this.name,
      paymentAmount:  this.amount!,
      paymentPeriod:  this.period,
      paymentDueDate: this.dueMonth == '' ? this.dueDay : this.dueMonth + '/' + this.dueDay,
      fromAccountId:  this.fromAccountId
    }
    this.name          = '';
    this.amount        = undefined;
    this.period        = '';
    this.dueMonth      = '';
    this.dueDay        = '';
    this.fromAccountId = 0;
    this._expenseService.addBill(newBill).subscribe(
      next => { }, error => { }, () => { this.formSubmit.emit("Subscription successfully added"); }
    );
  }
}
