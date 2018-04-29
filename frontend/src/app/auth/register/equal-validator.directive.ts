import {AbstractControl, ValidatorFn} from '@angular/forms';

export function equalValidator(): ValidatorFn {
  return (control: AbstractControl) => {
    const isEqual = control.value.password === control.value.confirmPassword;
    if (!isEqual) {
      control.get('confirmPassword').setErrors({isNotEqual: true});
    }
    return null;
  };
}
