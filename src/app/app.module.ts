import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { CardComponent } from './_components/card/card.component';
import { FooterComponent } from './_components/footer/footer.component';
import { AnimatedInputDirective } from './_directives/animated-input.directive';
import { Logger } from './_services/logger/logger';
import { environment } from './../environments/environment';
import { ENVIRONMENT } from './../environments/env.config';
import { SchemeSwitcherComponent } from './_components/theme-switcher/scheme-switcher.component';
import { LogoComponent } from './_components/logo/logo.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    CardComponent,
    FooterComponent,
    AnimatedInputDirective,
    SchemeSwitcherComponent,
    LogoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
  ],
  providers: [
    { provide: ENVIRONMENT, useValue: environment },
    { provide: Logger, useClass: environment.loggerProvider },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
