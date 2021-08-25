import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uniDate'
})
export class UniDatePipe implements PipeTransform {

  transform(value: string): string {
    if (value.split('/').length == 2)
      return value.split('/')[1];
    return value;
  }
}
