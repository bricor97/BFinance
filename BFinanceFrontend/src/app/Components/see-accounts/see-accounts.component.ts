import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { AccountService } from '../../Services/account.service';
import { GetAccount, PostAccount } from '../../Models/account';
import { FadeIn, FadeOut, ScaleDown, ScaleUp, SlideOutLeft } from '../../Animation';
import { SortByBankPipe } from '../../Pipes/sort-by-bank.pipe';

@Component({
  selector: 'app-see-accounts',
  templateUrl: './see-accounts.component.html',
  styleUrls: ['./see-accounts.component.css'],
  animations: [ScaleUp, ScaleDown, FadeIn, FadeOut, SlideOutLeft]
})
export class SeeAccountsComponent implements OnInit {

  accounts?: GetAccount[];
  message: string             = "";
  MESSAGE_DURATION_MS: number = 4000;
  accountSort: string[] = [
    'bank', 'name', 'type', 'number'
  ];
  selectedSort: string = this.accountSort[0];

  constructor(private _accountService: AccountService, private _sortByBankPipe: SortByBankPipe) { }

  ngOnInit(): void {
    console.log("JD");
    this.getAllAccounts();
    console.log("HDD");
  }

  getAllAccounts(): void {
    this._accountService.getAllAccounts().subscribe(
      accounts => this.accounts = this._sortByBankPipe.transform(accounts),
      () => { }, () => console.log(this.accounts)
    );
  }

  sortAccounts(sortCriteria: string): void {
    if (sortCriteria == 'bank') {
      this.accounts = this.accounts!.sort((acct1, acct2) => {
        if (acct1.accountBank < acct2.accountBank) return -1;
        else if (acct1.accountBank > acct2.accountBank) return 1;
        return 0;
      });
    } else if (sortCriteria == 'name') {
      this.accounts = this.accounts!.sort((acct1, acct2) => {
        if (acct1.accountName < acct2.accountName) return -1;
        else if (acct1.accountName > acct2.accountName) return 1;
        return 0;
      });
    } else if (sortCriteria == 'type') {
      this.accounts = this.accounts!.sort((acct1, acct2) => {
        if (acct1.accountType < acct2.accountType) return -1;
        else if (acct1.accountType > acct2.accountType) return 1;
        return 0;
      });
    } else if (sortCriteria == 'number') {
      this.accounts = this.accounts!.sort((acct1, acct2) => {
        if (acct1.accountNumber < acct2.accountNumber) return -1;
        else if (acct1.accountNumber > acct2.accountNumber) return 1;
        return 0;
      });
    }
  }

  deleteAccount(accountId: number): void {
    var confirmDelete = confirm("Are you sure you want to delete this account?");
    // check if the account is connected to an expense
    if (confirmDelete)
      this._accountService.deleteAccountById(accountId).subscribe(
        next => { }, error => { }, () => {
          this.getAllAccounts();
          this.message = "Account successfully deleted";
          setTimeout(() => this.message = '', this.MESSAGE_DURATION_MS);
        }
      );
  }

  addSubmitEventHandler(data: any): void {
    this.getAllAccounts();
    this.message = data;
    setTimeout(() => this.message = '', this.MESSAGE_DURATION_MS);
  }

  //editSubmitEventHandler(data: any): void {
  //  this.toggleEditDisplay(true, false);
  //  this.getAllAccounts();
  //  this.message = data;
  //  setTimeout(() => this.message = '', this.MESSAGE_DURATION_MS);
  //}

  //getEditAccount(accountId: number): void {
  //  this._accountService.getAccountById(accountId).subscribe(
  //    account => this.editAccount = account
  //  );
  //}
}
