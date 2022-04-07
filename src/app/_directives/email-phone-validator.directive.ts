import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, Validators } from '@angular/forms';

export function emailPhoneValidator(control: AbstractControl): ValidationErrors | null {
  if (/.*\@.*/.test(control.value)) { // validate as email
    const errors = Validators.pattern(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i)(control);
    if (errors && errors['pattern']) {
      return { email: errors['pattern'] };
    }
    return errors;
  }

  // validate as phone
  const errors = Validators.pattern(/^\+?[0-9]{8,15}$/i)(control);
  if (errors && errors['pattern']) {
    return { phone: errors['pattern'] };
  }
  return errors;
}

@Directive({
  selector: '[appEmailPhoneValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: EmailPhoneValidatorDirective, multi: true}],
})
export class EmailPhoneValidatorDirective implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
    return emailPhoneValidator(control);
  }
}
