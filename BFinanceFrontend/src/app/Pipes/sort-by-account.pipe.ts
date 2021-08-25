import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByAccount'
})
export class SortByAccountPipe implements PipeTransform {

  transform(value: any[]): any[] {
    return value.sort((exp1, exp2) => {
      if (exp1.fromAccountId < exp2.fromAccountId) return -1;
      if (exp1.fromAccountId > exp2.fromAccountId) return 1;
      return 0;
    });
  }
}
