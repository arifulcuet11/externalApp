import { Validators, FormControl } from '@angular/forms';
import * as moment from 'moment';
export class DateValidator extends Validators {

    static custom = (fdValue: FormControl) => {
        debugger;
        const value = fdValue.value;
        if (fdValue.touched && !moment.isMoment(fdValue.value)) return { invalid: true };
        else
            return null;
        // if (value !== null) {
        //     let date = null;
        //     const splitor = (value.indexOf('/')>-1)  ? value.split('/') : [];
        //     if (splitor.length !== 3 || value.length < 8 || value.length > 10 || (value.split('/').length == 3 && value.split('/')[2].length !== 4)) {
        //         if (splitor.length == 3) {
        //             date = moment(value, 'DD/MM/YYYY');
        //         }
        //     }
        //     if (date && !date.isValid()) return { invalid: true };
        // }
        // else {
        //     return { invalid: true };
        // }
    }
}