import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';
import { GetSubscription, PostSubscription } from '../Models/subscription';
import { GetBill, PostBill } from '../Models/bill';
import { GetAutoTransfer, PostAutoTransfer } from '../Models/autoTransfer';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private url: ApiUrlService, private http: HttpClient) { }

  getAllSubscriptions(): Observable<GetSubscription[]> {
    return this.http.get<GetSubscription[]>(`${this.url.getUrl()}Expense/GetAllSubscriptions`);
  }
  getSubscriptionById(subscriptionId: number): Observable<GetSubscription> {
    return this.http.get<GetSubscription>(`${this.url.getUrl()}Expense/GetSubscriptionById/${subscriptionId}`);
  }
  addSubscription(newSubscription: PostSubscription): Observable<PostSubscription> {
    return this.http.post<PostSubscription>(`${this.url.getUrl()}Expense/AddSubscription`, newSubscription, this.httpOptions);
  }
  deleteSubscriptionById(subscriptionId: number): Observable<PostSubscription> {
    return this.http.delete<PostSubscription>(`${this.url.getUrl()}Expense/DeleteSubscriptionById/${subscriptionId}`);
  }
  editSubscription(editSubscription: PostSubscription, subscriptionId: number): Observable<PostSubscription> {
    return this.http.put<PostSubscription>(`${this.url.getUrl()}Expense/EditSubscription/${subscriptionId}`, editSubscription, this.httpOptions);
  }

  getAllBills(): Observable<GetBill[]> {
    return this.http.get<GetBill[]>(`${this.url.getUrl()}Expense/GetAllBills`);
  }
  getBillById(billId: number): Observable<GetBill> {
    return this.http.get<GetBill>(`${this.url.getUrl()}Expense/GetBillById/${billId}`);
  }
  addBill(newBill: PostBill): Observable<PostBill> {
    return this.http.post<PostBill>(`${this.url.getUrl()}Expense/AddBill`, newBill, this.httpOptions);
  }
  deleteBillById(billId: number): Observable<PostBill> {
    return this.http.delete<PostBill>(`${this.url.getUrl()}Expense/DeleteBillById/${billId}`);
  }
  editBill(editBill: PostBill, billId: number): Observable<PostBill> {
    return this.http.put<PostBill>(`${this.url.getUrl()}Expense/EditBill/${billId}`, editBill, this.httpOptions);
  }

  getAllAutoTransfers(): Observable<GetAutoTransfer[]> {
    return this.http.get<GetAutoTransfer[]>(`${this.url.getUrl()}Expense/GetAllAutoTransfers`);
  }
  getAutoTransferById(autoTransferId: number): Observable<GetAutoTransfer> {
    return this.http.get<GetAutoTransfer>(`${this.url.getUrl()}Expense/GetAutoTransferById/${autoTransferId}`);
  }
  addAutoTransfer(newAutoTransfer: PostAutoTransfer): Observable<PostAutoTransfer> {
    return this.http.post<PostAutoTransfer>(`${this.url.getUrl()}Expense/AddAutoTransfer`, newAutoTransfer, this.httpOptions);
  }
  deleteAutoTransferById(autoTransferId: number): Observable<PostAutoTransfer> {
    return this.http.delete<PostAutoTransfer>(`${this.url.getUrl()}Expense/DeleteAutoTransferById/${autoTransferId}`);
  }
  editAutoTransfer(editAutoTransfer: PostAutoTransfer, autoTransferId: number): Observable<PostAutoTransfer> {
    return this.http.put<PostAutoTransfer>(`${this.url.getUrl()}Expense/EditAutoTransfer/${autoTransferId}`, editAutoTransfer, this.httpOptions);
  }
}
