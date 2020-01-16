import { AbstractControl } from '@angular/forms';

export function PhoneValidator(control: AbstractControl) {

    const phoneRegex = /^(01)([0-9]{9})$/;

    if (phoneRegex.test(control.value)) {
        return null;
    }

    return {
        phoneValid: true
    };
}
