import { Directive } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appCustomValidatorsDirective]'
})
export class CustomValidatorsDirectiveDirective {

  constructor() { }

  public isSame(v1: string, v2: string, error = 'isSame'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const val1 = control.get(v1);
      const val2 = control.get(v2);
      return val1 && val2 && val1.value === val2.value ? { [error]: true } : null;
    };
  }

  public isDifferent(v1: string, v2: string, error = 'isDifferent'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const val1 = control.get(v1);
      const val2 = control.get(v2);
      return val1 && val2 && val1.value !== val2.value ? { [error]: true } : null;
    };
  }

  public isGreaterValidator(isGreater: string, isLess: string, error = 'isGreater'): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const val1 = Number(control.value[isGreater].split(',').join(''));
      const val2 = Number(control.value[isLess].split(',').join(''));
      return val1 && val2 && val1 <= val2 ? { [error]: true } : null;
    };
  }

  public isAbove(num: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      if (isNaN(value)) {
        return null;
      }
      return value > num ? { isAbove: true } : null;
    };
  }

  public patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
      if (!control.value) {
        // if control is empty return no error
        return control.value;
      }
      // test the value of the control against the regexp supplied
      const valid = regex.test(control.value);
      // if true, return no error (no error), else return error passed in the second parameter
      return valid ?control.value : error;
    };
  }
  // public ConfirmPasswordValidator(controlName: string, matchingControlName: string) {
  //   return (formGroup: FormGroup) => {
  //     let control = formGroup.controls[controlName];
  //     let matchingControl = formGroup.controls[matchingControlName]
  //     if (
  //       matchingControl.errors &&
  //       !matchingControl.errors.confirmPasswordValidator
  //     ) {
  //       return;
  //     }
  //     if (control.value !== matchingControl.value) {
  //       matchingControl.setErrors({ confirmPasswordValidator: true });
  //     } else {
  //       matchingControl.setErrors(null);
  //     }
  //   };
  // }
}


