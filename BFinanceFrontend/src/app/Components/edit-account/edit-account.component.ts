import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { PostAccount, GetAccount } from '../../Models/account';
import { AccountService } from '../../Services/account.service';

@Component({
  selector: 'app-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.css']
})
export class EditAccountComponent implements OnInit {

  type: string = '';
  bank: string = '';
  number: string = '';
  name: string = '';
  @Input() editAccount!: GetAccount;
  postEditAccount!: PostAccount;

  @Output() formSubmit: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _accountService: AccountService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.postEditAccount = {
      accountBank: this.editAccount.accountBank,
      accountName: this.editAccount.accountName,
      accountNumber: this.editAccount.accountNumber,
      accountType: this.editAccount.accountType
    };
  }

  onSubmit(): void {
    if (this.type != '') {
      this.postEditAccount.accountType = this.type;
      this.type = '';
    }
    if (this.bank != '') {
      this.postEditAccount.accountBank = this.bank;
      this.bank = '';
    }
    if (this.number != '') {
      this.postEditAccount.accountNumber = this.number.toString();
      this.number = '';
    }
    if (this.name != '') {
      this.postEditAccount.accountName = this.name;
      this.name = '';
    }
    this._accountService.editAccount(this.postEditAccount, this.editAccount.accountId).subscribe(
      next => { }, error => { }, () => { this.formSubmit.emit("Account successfully updated"); }
    );
  }
}
