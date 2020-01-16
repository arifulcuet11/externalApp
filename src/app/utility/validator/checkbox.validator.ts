// import { FormGroup, ValidatorFn } from "@angular/forms";

// export function CheckboxValidator(minRequired = 1): ValidatorFn {
//     return function validate(formGroup: FormGroup) {
//         let checked = 0;

//         Object.keys(formGroup.controls).forEach(key => {
//             const control = formGroup.controls[key];

//             if (control.value === true) {
//                 checked++;
//             }
//         });

//         if (checked < minRequired) {
//             console.log(true);
//             return {
//                 checkboxValid: true,
//             };
//         }

//         console.log(false);

//         return null;
//     };
// }


import { AbstractControl } from '@angular/forms';

export function CheckboxValidator(control: AbstractControl) {

    // const phoneRegex = /^(01)([0-9]{9})$/;

    // if (phoneRegex.test(control.value)) {
    //     return null;
    // }

    console.log(control.value);

    return {
        checkboxValid: false
    };

}

