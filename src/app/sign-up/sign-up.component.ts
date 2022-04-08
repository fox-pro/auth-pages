import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormBuilder, ValidationErrors, Validators } from '@angular/forms';

import { emailPhoneValidator } from '../_directives/email-phone-validator.directive';
import { AuthService, SignInUpCredentials } from '../_services/auth.service';
import { Logger } from '../_services/logger/logger';

function checkPasswords(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirm = group.get('confirm')?.value
  return password === confirm ? null : { notSame: true }
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent {
  signupForm = this.fb.group({
    email: ['', [
      Validators.required,
      emailPhoneValidator,
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
    ]],
    confirm: [''],
  }, { validators: checkPasswords });

  loading = false;

  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private logger: Logger,
    private cdr: ChangeDetectorRef,
  ) { }

  get f(): { [key: string]: AbstractControl; } {
    return this.signupForm.controls;
  }

  isDisabled(): boolean {
    return (this.submitted && this.signupForm.invalid) || this.loading;
  }

  onSubmit() {
    this.submitted = true;

    if (this.signupForm.invalid) {
        return;
    }

    const data: SignInUpCredentials = {
      email: this.f['email'].value,
      password: this.f['password'].value,
    }

    this.loading = true;
    this.authService
      .signup(data)
      .subscribe((result) => {
        if (!!result) {
          this.logger.notice('id', result.id);
          this.submitted = false;
          this.signupForm.reset();
        }
        this.loading = false;
        this.cdr.markForCheck();
      })
  }
}
