import { Pipe, PipeTransform } from '@angular/core';
import { GetAccount } from '../Models/account';

@Pipe({
  name: 'sortByBank'
})
export class SortByBankPipe implements PipeTransform {

  transform(value: GetAccount[]): GetAccount[] {
    return value.sort((acct1, acct2) => {
      if (acct1.accountBank < acct2.accountBank) return -1;
      if (acct1.accountBank > acct2.accountBank) return 1;
      return 0;
    });
  }
}
