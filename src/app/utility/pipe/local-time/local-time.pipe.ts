import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'localTime'
})
export class LocalTimePipe implements PipeTransform {

  DEFAULT_PATTERN = 'DD MMM YYYY hh:mm A'
  transform(value: any, args?: any): any {
    
    if(value!=null && Date.parse(value)){
      let dt = moment.utc(value).toDate();
      const dtstr = moment(dt)
      .local()
      .format((args)? args: this.DEFAULT_PATTERN)
      return dtstr;
    }
    else null;
  }

}
