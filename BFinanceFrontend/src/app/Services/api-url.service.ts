import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiUrlService {

  private url: string = "https://localhost:44306/api/";

  constructor() { }

  getUrl(): string {
    return this.url;
  }
}
