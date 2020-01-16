import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minuteConversion'
})
export class MinuteConversionPipe implements PipeTransform {

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes + ':' + (value - minutes * 60);
 }

}
