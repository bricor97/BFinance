import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiUrlService } from './api-url.service';
import { GetAccount, PostAccount } from '../Models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private url: ApiUrlService, private http: HttpClient) { }

  getAllAccounts(): Observable<GetAccount[]> {
    return this.http.get<GetAccount[]>(`${this.url.getUrl()}Account/GetAllAccounts`);
  }

  getAccountById(accountId: number): Observable<GetAccount> {
    return this.http.get<GetAccount>(`${this.url.getUrl()}Account/GetAccountById/${accountId}`);
  }

  addAccount(newAccount: PostAccount): Observable<PostAccount> {
    return this.http.post<PostAccount>(`${this.url.getUrl()}Account/AddAccount`, newAccount, this.httpOptions);
  }

  deleteAccountById(accountId: number): Observable<PostAccount> {
    return this.http.delete<PostAccount>(`${this.url.getUrl()}Account/DeleteAccountById/${accountId}`);
  }

  editAccount(editAccount: PostAccount, accountId: number): Observable<PostAccount> {
    return this.http.put<PostAccount>(`${this.url.getUrl()}Account/EditAccount/${accountId}`, editAccount, this.httpOptions);
  }
}
