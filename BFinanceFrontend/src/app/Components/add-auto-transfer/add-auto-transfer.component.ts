import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { GetAccount } from '../../Models/account';
import { PostAutoTransfer } from '../../Models/autoTransfer';
import { AccountService } from '../../Services/account.service';
import { ExpenseService } from '../../Services/expense.service';

@Component({
  selector: 'app-add-auto-transfer',
  templateUrl: './add-auto-transfer.component.html',
  styleUrls: ['./add-auto-transfer.component.css']
})
export class AddAutoTransferComponent implements OnInit {

  name: string          = '';
  amount?: number;
  period: string        = '';
  dueMonth: string      = '';
  dueDay: string        = '';
  fromAccountId: number = 0;
  toAccountId: number   = 0;

  accounts!: GetAccount[];

  @Output() formSubmit: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _expenseService: ExpenseService, private _accountService: AccountService) { }

  ngOnInit(): void {
    this._accountService.getAllAccounts().subscribe(
      accounts => this.accounts = accounts
    );
  }

  onSubmit(): void {
    let newAutoTransfer: PostAutoTransfer = {
      transferName:   this.name,
      transferAmount: this.amount!,
      transferPeriod: this.period,
      transferDate:   this.dueMonth == '' ? this.dueDay : this.dueMonth + '/' + this.dueDay,
      fromAccountId:  this.fromAccountId,
      toAccountId:    this.toAccountId
    }
    this.name          = '';
    this.amount        = undefined;
    this.period        = '';
    this.dueMonth      = '';
    this.dueDay        = '';
    this.fromAccountId = 0;
    this.toAccountId   = 0;
    this._expenseService.addAutoTransfer(newAutoTransfer).subscribe(
      next => { }, error => { }, () => { this.formSubmit.emit("Automatic transfers successfully added"); }
    );
  }
}
