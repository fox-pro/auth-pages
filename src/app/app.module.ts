import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { DEFAULT_LANGUAGE, TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
import { LanguageSwitcherComponent } from './_components/language-switcher/language-switcher.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    CardComponent,
    FooterComponent,
    AnimatedInputDirective,
    SchemeSwitcherComponent,
    LogoComponent,
    LanguageSwitcherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    LoadingBarHttpClientModule,
    LoadingBarRouterModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      }
    }),
  ],
  providers: [
    { provide: ENVIRONMENT, useValue: environment },
    { provide: Logger, useClass: environment.loggerProvider },
    { provide: DEFAULT_LANGUAGE, useValue: environment.defaultLanguage },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
