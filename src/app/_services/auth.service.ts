import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';

import { Logger } from './logger/logger';
import { ENVIRONMENT, EnvironmentInterface } from 'src/environments/env.config';

export interface SignInCredentials {
  email: string;
  password: string;
}

interface SignInResponse {
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

  signin(data: SignInCredentials): Observable<SignInResponse | null> {
    return this.http
      .patch<SignInResponse>(`${this.baseUrl}/sign-in`, data)
      .pipe(
        catchError((error: Error) => {
          if (error instanceof HttpErrorResponse) {
            this.logger.error('SignIn request failed', error);
          }
          return of(null);
        }),
      )
  }
}
