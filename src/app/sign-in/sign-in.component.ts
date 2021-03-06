import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { emailPhoneValidator } from '../_directives/email-phone-validator.directive';
import { AuthService, SignInUpCredentials } from '../_services/auth.service';
import { Logger } from '../_services/logger/logger';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  loginForm = this.fb.group({
    email: ['', [
      Validators.required,
      emailPhoneValidator,
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(6),
    ]],
  });

  loading = false;

  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private logger: Logger,
    private cdr: ChangeDetectorRef,
    private router: Router,
  ) { }

  get f(): { [key: string]: AbstractControl; } {
    return this.loginForm.controls;
  }

  isDisabled(): boolean {
    return (this.submitted && this.loginForm.invalid) || this.loading;
  }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid) {
        return;
    }

    const data: SignInUpCredentials = {
      email: this.f['email'].value,
      password: this.f['password'].value,
    }

    this.loading = true;
    this.authService
      .signin(data)
      .subscribe((result) => {
        if (!!result) {
          this.logger.notice(`Welcome, ${result.name}`);
          this.submitted = false;
          this.router.navigate([]);
          this.loginForm.reset();
        }
        this.loading = false;
        this.cdr.markForCheck();
      })
  }
}
