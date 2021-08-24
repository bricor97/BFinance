import { Component, OnInit, ViewChild } from '@angular/core';
import { GetAutoTransfer } from '../../Models/autoTransfer';
import { GetBill } from '../../Models/bill';
import { GetSubscription } from '../../Models/subscription';
import { AccountService } from '../../Services/account.service';
import { ExpenseService } from '../../Services/expense.service';

@Component({
  selector: 'app-see-calendar',
  templateUrl: './see-calendar.component.html',
  styleUrls: ['./see-calendar.component.css']
})
export class SeeCalendarComponent implements OnInit {

  todayDate = new Date();
  subscriptions?: GetSubscription[];
  thisMonthSubscriptions: GetSubscription[] = [];
  bills?: GetBill[];
  thisMonthBills: GetBill[] = [];
  autoTransfers?: GetAutoTransfer[];
  thisMonthAutoTransfers: GetAutoTransfer[] = [];

  constructor(private _expenseService: ExpenseService, private _accountService: AccountService) { }

  ngOnInit() {
    this.getAllSubscriptions();
    this.getAllBills();
    this.getAllAutoTransfers();
  }

  thisMonth(): string {
    return this.todayDate.getMonth().toString();
  }
  isMonthAndDay(dueDate: string): boolean {
    return (dueDate.split('/').length == 2);
  }
  isThisMonth(dueDate: string): boolean {
    if (!this.isMonthAndDay(dueDate)) {
      return true;
    }
    else if (parseInt(dueDate.split('/')[0]) - 1 == parseInt(this.thisMonth())) {
      return true;
    }
    return false;
  }

  compareBills(bill1: GetBill, bill2: GetBill): number {
    if (parseInt(bill1.paymentDueDate) < parseInt(bill2.paymentDueDate))
      return -1;
    if (bill1.paymentDueDate > bill2.paymentDueDate)
      return 1;
    return 0;
  }
  compareSubs(sub1: GetSubscription, sub2: GetSubscription): number {
    if (parseInt(sub1.paymentDueDate) < parseInt(sub2.paymentDueDate))
      return -1;
    if (sub1.paymentDueDate > sub2.paymentDueDate)
      return 1;
    return 0;
  }
  compareAutoTs(autoT1: GetAutoTransfer, autoT2: GetAutoTransfer): number {
    if (parseInt(autoT1.transferDate) < parseInt(autoT2.transferDate))
      return -1;
    if (autoT1.transferDate > autoT2.transferDate)
      return 1;
    return 0;
  }

  getThisMonthExpenseTotal(): number {
    return this.getThisMonthSubscriptionTotal() + this.getThisMonthBillTotal();
  }


  getAllSubscriptions(): void {
    this._expenseService.getAllSubscriptions().subscribe(
      subscriptions => {
        this.subscriptions = subscriptions;
        this.getThisMonthSubscriptions();
      }
    );
  }
  getThisMonthSubscriptions(): void {
    if (this.subscriptions) {
      for (var i = 0; i < this.subscriptions.length; i++) {
        //console.log(this.isThisMonth(this.subscriptions[i].paymentDueDate));
        if (this.isThisMonth(this.subscriptions[i].paymentDueDate)) {
          this.thisMonthSubscriptions?.push(this.subscriptions[i]);
        }
      }
    }
  }
  getThisMonthSubscriptionTotal(): number {
    let monthTotal = 0;
    for (let i = 0; i < this.thisMonthSubscriptions.length; i++) {
      monthTotal += this.thisMonthSubscriptions[i].paymentAmount;
    }
    return monthTotal;
  }

  getAllBills(): void {
    this._expenseService.getAllBills().subscribe(
      bills => {
        this.bills = bills;
        this.getThisMonthBills();
      }
    );
  }
  getThisMonthBills(): void {
    if (this.bills) {
      for (var i = 0; i < this.bills.length; i++) {
        if (this.isThisMonth(this.bills[i].paymentDueDate)) {
          this.thisMonthBills?.push(this.bills[i]);
        }
      }
    }
  }
  getThisMonthBillTotal(): number {
    let monthTotal = 0;
    for (let i = 0; i < this.thisMonthBills.length; i++) {
      monthTotal += this.thisMonthBills[i].paymentAmount;
    }
    return monthTotal;
  }

  getAllAutoTransfers(): void {
    this._expenseService.getAllAutoTransfers().subscribe(
      autoTransfers => {
        this.autoTransfers = autoTransfers;
        this.getThisMonthAutoTransfers();
      }
    );
  }
  getThisMonthAutoTransfers(): void {
    if (this.autoTransfers) {
      for (var i = 0; i < this.autoTransfers.length; i++) {
        if (this.isThisMonth(this.autoTransfers[i].transferDate)) {
          this.thisMonthAutoTransfers?.push(this.autoTransfers[i]);
        }
      }
    }
  }
  getThisMonthAutoTransferTotal(): number {
    let monthTotal = 0;
    for (let i = 0; i < this.thisMonthAutoTransfers.length; i++) {
      monthTotal += this.thisMonthAutoTransfers[i].transferAmount;
    }
    return monthTotal;
  }
}
