import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

import { Logger } from './logger/logger';
import { ENVIRONMENT, EnvironmentInterface } from 'src/environments/env.config';

export interface SignInUpCredentials {
  email: string;
  password: string;
}

export interface ResetPasswordCredentials {
  email: string;
}

interface SignInUpResponse {
  id: string;
  name: string;
  token: {
    access: string;
    refresh: string;
    type: string;
    expires: number;
  }
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private logger: Logger,
    @Inject(ENVIRONMENT) env: EnvironmentInterface,
  ) {
    this.baseUrl = env.authApiBaseUrl;
  }

  signin(data: SignInUpCredentials): Observable<SignInUpResponse | null> {
    return this.http
      .patch<SignInUpResponse>(`${this.baseUrl}/sign-in`, data)
      .pipe(
        catchError((error: Error) => {
          if (error instanceof HttpErrorResponse) {
            this.logger.error('SignIn request failed', error);
          }
          return of(null);
        }),
      )
  }

  signup(data: SignInUpCredentials): Observable<SignInUpResponse | null> {
    return this.http
      .patch<SignInUpResponse>(`${this.baseUrl}/sign-up`, data)
      .pipe(
        catchError((error: Error) => {
          if (error instanceof HttpErrorResponse) {
            this.logger.error('SignUp request failed', error);
          }
          return of(null);
        }),
      )
  }

  resetPassword(data: ResetPasswordCredentials): Observable<{ actionCompleted: boolean } | null> {
    return this.http
      .patch<{ actionCompleted: boolean }>(`${this.baseUrl}/reset-password`, data)
      .pipe(
        catchError((error: Error) => {
          if (error instanceof HttpErrorResponse) {
            this.logger.error('Reset password request failed', error);
          }
          return of(null);
        }),
      )
  }
}
