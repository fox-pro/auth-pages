import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';

import { emailPhoneValidator } from '../_directives/email-phone-validator.directive';
import { AuthService, ResetPasswordCredentials } from '../_services/auth.service';
import { Logger } from '../_services/logger/logger';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForgotComponent {
  forgotForm = this.fb.group({
    email: ['', [
      Validators.required,
      emailPhoneValidator,
    ]],
  });

  loading = false;

  submitted = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private logger: Logger,
    private cdr: ChangeDetectorRef,
  ) { }

  get f(): { [key: string]: AbstractControl; } {
    return this.forgotForm.controls;
  }

  isDisabled(): boolean {
    return (this.submitted && this.forgotForm.invalid) || this.loading;
  }

  onSubmit() {
    this.submitted = true;

    if (this.forgotForm.invalid) {
        return;
    }

    const data: ResetPasswordCredentials = {
      email: this.f['email'].value,
    }

    this.loading = true;
    this.authService
      .resetPassword(data)
      .subscribe((result) => {
        if (!!result) {
          this.logger.notice('actionCompleted', result.actionCompleted);
          this.submitted = false;
          this.forgotForm.reset();
        }
        this.loading = false;
        this.cdr.markForCheck();
      })
  }
}
