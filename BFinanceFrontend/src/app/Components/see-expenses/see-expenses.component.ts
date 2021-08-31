import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { GetSubscription, PostSubscription } from '../../Models/subscription';
import { GetBill, PostBill } from '../../Models/bill';
import { GetAutoTransfer, PostAutoTransfer } from '../../Models/autoTransfer';
import { ExpenseService } from '../../Services/expense.service';
import { GetAccount } from '../../Models/account';
import { AccountService } from '../../Services/account.service';
import { FadeIn, FadeOut, ScaleDown, ScaleUp, SlideOutLeft } from '../../Animation';
import { SortByAccountPipe } from '../../Pipes/sort-by-account.pipe';

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

  subBillSort: string[] = [
    'name', 'amount', 'period', 'date', 'source account'
    ];
  autoTSort: string[] = [
    'name', 'amount', 'period', 'date', 'source account', 'target account'
    ];
  selectedSubSort: string = this.subBillSort[4];
  selectedBillSort: string = this.subBillSort[4];
  selectedAutoTSort: string = this.autoTSort[4];

  @ViewChild('autoTransferSection') autoTransferSection!: ElementRef;
  @ViewChild('subscriptionSection') subscriptionSection!: ElementRef;
  @ViewChild('billSection') billSection!: ElementRef;

  @ViewChild('subscription_table') subscriptionTable!: ElementRef;
  @ViewChild('bill_table') billTable!: ElementRef;
  @ViewChild('auto_transfer_table') autoTransferTable!: ElementRef;

  constructor(private _expenseService: ExpenseService, private _accountService: AccountService,
    private _renderer: Renderer2, private _sortByAccount: SortByAccountPipe) { }

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
    this._accountService.getAllAccounts().subscribe(
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

  sortSubscriptions(sortCriteria: string): void {
    if (sortCriteria == 'amount') {
      this.subscriptions = this.subscriptions!.sort((sub1, sub2) => {
        if (sub1.paymentAmount < sub2.paymentAmount) return -1;
        else if (sub1.paymentAmount > sub2.paymentAmount) return 1;
        return 0;
      });
    } else if (sortCriteria == 'name') {
      this.subscriptions = this.subscriptions!.sort((sub1, sub2) => {
        if (sub1.subscriptionName < sub2.subscriptionName) return -1;
        else if (sub1.subscriptionName > sub2.subscriptionName) return 1;
        return 0;
      });
    } else if (sortCriteria == 'period') {
      this.subscriptions = this.subscriptions!.sort((sub1, sub2) => {
        if (sub1.paymentPeriod < sub2.paymentPeriod) return -1;
        else if (sub1.paymentPeriod > sub2.paymentPeriod) return 1;
        return 0;
      });
    } else if (sortCriteria == 'date') {
      this.subscriptions = this.subscriptions!.sort((sub1, sub2) => {
        if (sub1.paymentDueDate < sub2.paymentDueDate) return -1;
        else if (sub1.paymentDueDate > sub2.paymentDueDate) return 1;
        return 0;
      });
    } else if (sortCriteria == 'src_acct') {
      this.subscriptions = this.subscriptions!.sort((sub1, sub2) => {
        if (sub1.fromAccountId < sub2.fromAccountId) return -1;
        else if (sub1.fromAccountId > sub2.fromAccountId) return 1;
        return 0;
      });
    }
  }
  sortBills(sortCriteria: string): void {
    if (sortCriteria == 'amount') {
      this.bills = this.bills!.sort((bill1, bill2) => {
        if (bill1.paymentAmount < bill2.paymentAmount) return -1;
        else if (bill1.paymentAmount > bill2.paymentAmount) return 1;
        return 0;
      });
    } else if (sortCriteria == 'name') {
      this.bills = this.bills!.sort((bill1, bill2) => {
        if (bill1.billName < bill2.billName) return -1;
        else if (bill1.billName > bill2.billName) return 1;
        return 0;
      });
    } else if (sortCriteria == 'period') {
      this.bills = this.bills!.sort((bill1, bill2) => {
        if (bill1.paymentPeriod < bill2.paymentPeriod) return -1;
        else if (bill1.paymentPeriod > bill2.paymentPeriod) return 1;
        return 0;
      });
    } else if (sortCriteria == 'date') {
      this.bills = this.bills!.sort((bill1, bill2) => {
        if (parseInt(bill1.paymentDueDate) < parseInt(bill2.paymentDueDate)) return -1;
        else if (parseInt(bill1.paymentDueDate) > parseInt(bill2.paymentDueDate)) return 1;
        return 0;
      });
    } else if (sortCriteria == 'src_acct') {
      this.bills = this.bills!.sort((bill1, bill2) => {
        if (bill1.fromAccountId < bill2.fromAccountId) return -1;
        else if (bill1.fromAccountId > bill2.fromAccountId) return 1;
        return 0;
      });
    }
  }
  sortAutoTransfers(sortCriteria: string): void {
    if (sortCriteria == 'amount') {
      this.autoTransfers = this.autoTransfers!.sort((autoT1, autoT2) => {
        if (autoT1.transferAmount < autoT2.transferAmount) return -1;
        else if (autoT1.transferAmount > autoT2.transferAmount) return 1;
        return 0;
      });
    } else if (sortCriteria == 'name') {
      this.autoTransfers = this.autoTransfers!.sort((autoT1, autoT2) => {
        if (autoT1.transferName < autoT2.transferName) return -1;
        else if (autoT1.transferName > autoT2.transferName) return 1;
        return 0;
      });
    } else if (sortCriteria == 'period') {
      this.autoTransfers = this.autoTransfers!.sort((autoT1, autoT2) => {
        if (autoT1.transferPeriod < autoT2.transferPeriod) return -1;
        else if (autoT1.transferPeriod > autoT2.transferPeriod) return 1;
        return 0;
      });
    } else if (sortCriteria == 'date') {
      this.autoTransfers = this.autoTransfers!.sort((autoT1, autoT2) => {
        if (parseInt(autoT1.transferDate) < parseInt(autoT2.transferDate)) return -1;
        else if (parseInt(autoT1.transferDate) > parseInt(autoT2.transferDate)) return 1;
        return 0;
      });
    } else if (sortCriteria == 'src_acct') {
      this.autoTransfers = this.autoTransfers!.sort((autoT1, autoT2) => {
        if (autoT1.fromAccountId < autoT2.fromAccountId) return -1;
        else if (autoT1.fromAccountId > autoT2.fromAccountId) return 1;
        return 0;
      });
    } else if (sortCriteria == 'tgt_acct') {
      this.autoTransfers = this.autoTransfers!.sort((autoT1, autoT2) => {
        if (autoT1.toAccountId < autoT2.toAccountId) return -1;
        else if (autoT1.toAccountId > autoT2.toAccountId) return 1;
        return 0;
      });
    }
  }

  addSubscriptionSubmitEventHandler(data: any): void {
    this.getAllSubscriptions();
    this.subscriptionMessage = data;
    setTimeout(() => this.subscriptionMessage = '', this.MESSAGE_DURATION_MS);
  }
  addBillSubmitEventHandler(data: any): void {
    this.getAllBills();
    this.billMessage = data;
    setTimeout(() => this.billMessage = '', this.MESSAGE_DURATION_MS);
  }
  addAutoTransferSubmitEventHandler(data: any): void {
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
      subscriptions => this.subscriptions = this._sortByAccount.transform(subscriptions)
    );
  }

  getAllBills(): void {
    this._expenseService.getAllBills().subscribe(
      bills => this.bills = this._sortByAccount.transform(bills)
    );
  }

  getAllAutoTransfers(): void {
    this._expenseService.getAllAutoTransfers().subscribe(
      autoTransfers => this.autoTransfers = this._sortByAccount.transform(autoTransfers)
    );
  }
}
