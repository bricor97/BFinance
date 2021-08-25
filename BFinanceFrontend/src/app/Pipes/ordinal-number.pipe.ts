import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordinalNumber'
})
export class OrdinalNumberPipe implements PipeTransform {

  transform(value: string): string {
    let lastChar = value.substr(value.length - 1);
    if (lastChar == '1' && value != '11') return value.concat('st');
    else if (lastChar == '2' && value != '12') return value.concat('nd');
    else if (lastChar == '3' && value != '13') return value.concat('rd');
    else return value.concat('th');
  }

}
