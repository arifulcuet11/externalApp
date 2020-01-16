import { AbstractControl } from '@angular/forms';

export function DatePreviousValidator(control: AbstractControl) {
    const currentDateTime = new Date();
    currentDateTime.setHours(0, 0, 0, 0);

    const controlDateTime = new Date(control.value);
    controlDateTime.setHours(0, 0, 0, 0);


    if (currentDateTime < controlDateTime) {
        return { notPreviousDate: true };
    }

    return null;
}
