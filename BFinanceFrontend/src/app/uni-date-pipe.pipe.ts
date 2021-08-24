import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'uniDatePipe'
})
export class UniDatePipePipe implements PipeTransform {

  transform(value: string): string {
    if (value.split('/').length == 2)
      return value.split('/')[1];
    return value;
  }
}
