import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { GetSubscription, PostSubscription } from '../../Models/subscription';
import { GetBill, PostBill } from '../../Models/bill';
import { GetAutoTransfer, PostAutoTransfer } from '../../Models/autoTransfer';
import { ExpenseService } from '../../Services/expense.service';
import { GetAccount } from '../../Models/account';
import { AccountService } from '../../Services/account.service';
import { FadeIn, FadeOut, ScaleDown, ScaleUp, SlideOutLeft } from '../../Animation';

@Component({
  selector: 'app-see-expenses',
  templateUrl: './see-expenses.component.html',
  styleUrls: ['./see-expenses.component.css'],
  animations: [ScaleUp, ScaleDown, FadeIn, FadeOut, SlideOutLeft]
})
export class SeeExpensesComponent implements OnInit {

  accounts!: GetAccount[];
  subscriptions!: GetSubscription[];
  bills?: GetBill[];
  autoTransfers?: GetAutoTransfer[];

  subscriptionMessage: string = "";
  billMessage: string = "";
  autoTransferMessage: string = "";
  MESSAGE_DURATION_MS: number = 4000;

  //editSubscription?: GetSubscription;
  //editBill?: GetBill;
  //editAutoTransfer?: GetAutoTransfer;

  addSubscriptionDisplay: boolean = false;
  addBillDisplay: boolean = false;
  addAutoTransferDisplay: boolean = false;

  //editSubscriptionDisplay: boolean = false;
  //editBillDisplay: boolean = false;
  //editAutoTransferDisplay: boolean = false;

  @ViewChild('autoTransferSection') autoTransferSection!: ElementRef;
  @ViewChild('subscriptionSection') subscriptionSection!: ElementRef;
  @ViewChild('billSection') billSection!: ElementRef;

  @ViewChild('subscription_table') subscriptionTable!: ElementRef;
  @ViewChild('bill_table') billTable!: ElementRef;
  @ViewChild('auto_transfer_table') autoTransferTable!: ElementRef;

  constructor(private _expenseService: ExpenseService, private _accountService: AccountService,
    private _renderer: Renderer2) { }

  ngOnInit(): void {
    this.getAllSubscriptions();
    this.getAllBills();
    this.getAllAutoTransfers();
    this.getAllAccounts();
  }

  scrollElementIntoView(toScrollEl: ElementRef): void {
    toScrollEl.nativeElement.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  getAllAccounts(): void {
    this._accountService.getAllAcounts().subscribe(
      accounts => this.accounts = accounts
    );
  }

  getFocusAccount(fromAccountId: number): GetAccount {
    if (typeof this.accounts !== 'undefined') 
      for (let i = 0; i < this.accounts.length; i++) 
        if (this.accounts[i].accountId == fromAccountId)
          return this.accounts[i];
    return { accountId: 0, accountType: '', accountName: '', accountBank: '', accountNumber: '' };
  }

  addSubscriptionSubmitEventHandler(data: any): void {
    this.toggleAddSubscription(true);
    this.getAllSubscriptions();
    this.subscriptionMessage = data;
    setTimeout(() => this.subscriptionMessage = '', this.MESSAGE_DURATION_MS);
  }
  addBillSubmitEventHandler(data: any): void {
    this.toggleAddBill(true);
    this.getAllBills();
    this.billMessage = data;
    setTimeout(() => this.billMessage = '', this.MESSAGE_DURATION_MS);
  }
  addAutoTransferSubmitEventHandler(data: any): void {
    this.toggleAddAutoTransfer(true);
    this.getAllAutoTransfers();
    this.autoTransferMessage = data;
    setTimeout(() => this.autoTransferMessage = '', this.MESSAGE_DURATION_MS);
  }

  //editSubscriptionSubmitEventHandler(data: any): void {
  //  this.toggleEditSubscriptionDisplay(true, false);
  //  this.subscriptionMessage = data;
  //  setTimeout(() => this.subscriptionMessage = '', this.MESSAGE_DURATION_MS);
  //}
  //editBillSubmitEventHandler(data: any): void {
  //  this.toggleEditBillDisplay(true, false);
  //  this.billMessage = data;
  //  setTimeout(() => this.billMessage = '', this.MESSAGE_DURATION_MS);
  //}
  //editAutoTransferSubmit(data: any): void {
  //  this.toggleEditAutoTransferDisplay(true, false);
  //  this.autoTransferMessage = data;
  //  setTimeout(() => this.autoTransferMessage = '', this.MESSAGE_DURATION_MS);
  //}

  toggleAddSubscription(doSlide?: boolean): void {
    this.addSubscriptionDisplay = !this.addSubscriptionDisplay;
    if (doSlide)
      if (this.addSubscriptionDisplay) {
        this._renderer.addClass(this.subscriptionTable.nativeElement, 'tableSlideDown');
        this._renderer.addClass(this.billSection.nativeElement, 'tableSlideDown');
        this._renderer.addClass(this.autoTransferSection.nativeElement, 'tableSlideDown');
      } else {
        this._renderer.removeClass(this.subscriptionTable.nativeElement, 'tableSlideDown');
        this._renderer.removeClass(this.billSection.nativeElement, 'tableSlideDown');
        this._renderer.removeClass(this.autoTransferSection.nativeElement, 'tableSlideDown');
      }
  }
  toggleAddBill(doSlide?: boolean): void {
    this.addBillDisplay = !this.addBillDisplay;
    if (doSlide)
      if (this.addBillDisplay) {
        this._renderer.addClass(this.billTable.nativeElement, 'tableSlideDown');
        this._renderer.addClass(this.autoTransferSection.nativeElement, 'tableSlideDown');
      } else {
        this._renderer.removeClass(this.billTable.nativeElement, 'tableSlideDown');
        this._renderer.removeClass(this.autoTransferSection.nativeElement, 'tableSlideDown');
      }
  }
  toggleAddAutoTransfer(doSlide?: boolean): void {
    this.addAutoTransferDisplay = !this.addAutoTransferDisplay;
    if (doSlide)
      if (this.addAutoTransferDisplay) {
        this._renderer.addClass(this.autoTransferTable.nativeElement, 'tableSlideDown');
      } else {
        this._renderer.removeClass(this.autoTransferTable.nativeElement, 'tableSlideDown');
      }
  }

  //toggleEditSubscription(subscriptionId?: number) {
  //  if (this.addSubscriptionDisplay) {
  //    this.toggleAddSubscription();
  //    setTimeout(() => {
  //      if (typeof subscriptionId !== 'undefined') {
  //        this.getEditSubscription(subscriptionId);
  //        if (subscriptionId != this.editSubscription?.subscriptionId)
  //          this.toggleEditSubscriptionDisplay(true, true);
  //        else
  //          this.toggleEditSubscriptionDisplay(true);
  //      } else
  //        this.toggleEditSubscriptionDisplay(true, false);
  //    }, 300);
  //  } else {
  //    if (typeof subscriptionId !== 'undefined') {
  //      this.getEditSubscription(subscriptionId);
  //      if (subscriptionId != this.editSubscription?.subscriptionId)
  //        this.toggleEditSubscriptionDisplay(true, true);
  //      else
  //        this.toggleEditSubscriptionDisplay(true);
  //    } else
  //      this.toggleEditSubscriptionDisplay(true, false);
  //  }
  //}
  //toggleEditSubscriptionDisplay(doSlide: boolean, doDisplay?: boolean): void {
  //  if (typeof doDisplay === 'undefined') {
  //    this.editSubscriptionDisplay = !this.editSubscriptionDisplay;
  //    if (doSlide)
  //      if (this.editSubscriptionDisplay) {
  //        this._renderer.addClass(this.subscriptionTable.nativeElement, 'tableSlideDown');
  //        this._renderer.removeClass(this.billSection.nativeElement, 'tableSlideDown');
  //        this._renderer.addClass(this.autoTransferSection.nativeElement, 'tableSlideDown');
  //      }
  //  } else {
  //    this.editSubscriptionDisplay = doDisplay!;
  //    if (doSlide)
  //      if (this.editSubscriptionDisplay) {
  //        this._renderer.addClass(this.subscriptionTable.nativeElement, 'tableSlideDown');
  //        this._renderer.removeClass(this.billSection.nativeElement, 'tableSlideDown');
  //        this._renderer.addClass(this.autoTransferSection.nativeElement, 'tableSlideDown');
  //      }
  //  }
  //}
  //toggleEditBill(billId?: number) {

  //}
  //toggleEditBillDisplay(doSlide: boolean, doDisplay?: boolean): void {

  //}
  //toggleEditAutoTransfer(autoTransferId?: number) {

  //}
  //toggleEditAutoTransferDisplay(doSlide: boolean, doDisplay?: boolean): void {

  //}

  //getEditSubscription(subscriptionId: number): void {
  //  this._expenseService.getSubscriptionById(subscriptionId).subscribe(
  //    subscription => this.editSubscription = subscription
  //  );
  //}
  //getEditBill(billId: number): void {
  //  this._expenseService.getBillById(billId).subscribe(
  //    subscription => this.editBill = subscription
  //  );
  //}
  //getEditAutoTransfer(autoTransferId: number): void {
  //  this._expenseService.getAutoTransferById(autoTransferId).subscribe(
  //    subscription => this.editAutoTransfer = subscription
  //  );
  //}

  deleteSubscription(subscriptionId: number): void {
    var confirmDelete = confirm("Are you sure you want to delete this subscription?");
    if (confirmDelete)
      this._expenseService.deleteSubscriptionById(subscriptionId).subscribe(
        () => { }, () => { }, () => {
          this.getAllSubscriptions();
          this.subscriptionMessage = "Subscription successfully deleted";
          setTimeout(() => this.subscriptionMessage = '', this.MESSAGE_DURATION_MS);
        }
      );
  }
  deleteBill(billId: number): void {
    var confirmDelete = confirm("Are you sure you want to delete this bill?");
    if (confirmDelete)
      this._expenseService.deleteBillById(billId).subscribe(
        () => { }, () => { }, () => {
          this.getAllBills();
          this.billMessage = "Bill successfully deleted";
          setTimeout(() => this.billMessage = '', this.MESSAGE_DURATION_MS);
        }
      );
  }
  deleteAutoTransfer(autoTransferId: number): void {
    var confirmDelete = confirm("Are you sure you want to delete this automatic transfer?");
    if (confirmDelete)
      this._expenseService.deleteAutoTransferById(autoTransferId).subscribe(
        () => { }, () => { }, () => {
          this.getAllAutoTransfers();
          this.autoTransferMessage = "Automatic transfer successfully deleted";
          setTimeout(() => this.autoTransferMessage = '', this.MESSAGE_DURATION_MS);
        }
      );
  }

  getAllSubscriptions(): void {
    this._expenseService.getAllSubscriptions().subscribe(
      subscriptions => this.subscriptions = subscriptions
    );
  }

  getAllBills(): void {
    this._expenseService.getAllBills().subscribe(
      bills => this.bills = bills
    );
  }

  getAllAutoTransfers(): void {
    this._expenseService.getAllAutoTransfers().subscribe(
      autoTransfers => this.autoTransfers = autoTransfers
    );
  }
}
