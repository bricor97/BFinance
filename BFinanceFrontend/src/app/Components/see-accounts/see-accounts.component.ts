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
  addAcctDisplay: boolean     = false;
  //editAcctDisplay: boolean = false;
  //editAccount?: GetAccount;
  message: string             = "";
  MESSAGE_DURATION_MS: number = 4000;
  accountSort: string[] = ['bank', 'name', 'type', 'number'];
  selectedSort: string = this.accountSort[0];

  @ViewChild('account_table') accountTable!: ElementRef;

  constructor(private _accountService: AccountService, private _renderer: Renderer2,
    private _sortByBankPipe: SortByBankPipe) { }

  ngOnInit(): void {
    this.getAllAccounts();
  }

  getAllAccounts(): void {
    this._accountService.getAllAcounts().subscribe(
      accounts => this.accounts = this._sortByBankPipe.transform(accounts)
    );
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
    this.toggleAddAccount(true);
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

  toggleAddAccount(doSlide?: boolean): void {
    //if (this.editAcctDisplay) {
    //  this.toggleEditDisplay(false);
    //  setTimeout(() => {
    //    this.addAcctDisplay = !this.addAcctDisplay;
    //    if (doSlide)
    //      this.addAcctDisplay ?
    //        this._renderer.addClass(this.accountTable.nativeElement, 'tableSlideDown') :
    //        this._renderer.removeClass(this.accountTable.nativeElement, 'tableSlideDown');
    //  }, 300);
    //} else {
    //  this.addAcctDisplay = !this.addAcctDisplay;
    //  if (doSlide)
    //    this.addAcctDisplay ?
    //      this._renderer.addClass(this.accountTable.nativeElement, 'tableSlideDown') :
    //      this._renderer.removeClass(this.accountTable.nativeElement, 'tableSlideDown');
    //}

    this.addAcctDisplay = !this.addAcctDisplay;
    if (doSlide)
      this.addAcctDisplay ?
        this._renderer.addClass(this.accountTable.nativeElement, 'tableSlideDown') :
        this._renderer.removeClass(this.accountTable.nativeElement, 'tableSlideDown');
  }

  //toggleEditAccount(accountId?: number): void {
  //  if (this.addAcctDisplay) {
  //    this.toggleAddAccount();
  //    setTimeout(() => {
  //      if (typeof accountId !== 'undefined') {
  //        this.getEditAccount(accountId);
  //        if (accountId != this.editAccount?.accountId)
  //          this.toggleEditDisplay(true, true);
  //        else
  //          this.toggleEditDisplay(true);
  //      } else
  //        this.toggleEditDisplay(true, false);
  //    }, 300);
  //  } else {
  //    if (typeof accountId !== 'undefined') {
  //      this.getEditAccount(accountId);
  //      if (accountId != this.editAccount?.accountId)
  //        this.toggleEditDisplay(true, true);
  //      else
  //        this.toggleEditDisplay(true);
  //    } else
  //      this.toggleEditDisplay(true, false);
  //  }
  //}
  //toggleEditDisplay(doSlide: boolean, doDisplay?: boolean): void {
  //  if (typeof doDisplay === 'undefined') {
  //    this.editAcctDisplay = !this.editAcctDisplay;
  //    if (doSlide)
  //      this.editAcctDisplay ?
  //        this._renderer.addClass(this.accountTable.nativeElement, 'tableSlideDown') :
  //        this._renderer.removeClass(this.accountTable.nativeElement, 'tableSlideDown');
  //  } else {
  //    this.editAcctDisplay = doDisplay!;
  //    if (doSlide)
  //      this.editAcctDisplay ?
  //        this._renderer.addClass(this.accountTable.nativeElement, 'tableSlideDown') :
  //        this._renderer.removeClass(this.accountTable.nativeElement, 'tableSlideDown');
  //  }
  //}

  //getEditAccount(accountId: number): void {
  //  this._accountService.getAccountById(accountId).subscribe(
  //    account => this.editAccount = account
  //  );
  //}
}
