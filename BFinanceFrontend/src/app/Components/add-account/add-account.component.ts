import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AccountService } from '../../Services/account.service';
import { PostAccount } from '../../Models/account';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {

  type:   string = '';
  bank:   string = '';
  number: string = '';
  name:   string = '';

  @Output() formSubmit: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _accountService: AccountService) { }

  ngOnInit(): void { } 

  onSubmit(): void {
    let newAccount: PostAccount = {
      accountType:   this.type,
      accountBank:   this.bank,
      accountName:   this.name,
      accountNumber: this.number.toString()
    }
    this.type   = '';
    this.bank   = '';
    this.number = '';
    this.name   = '';
    this._accountService.addAccount(newAccount).subscribe(
      next => { }, error => { }, () => { this.formSubmit.emit("Account successfully added"); }
    );
  }
}
