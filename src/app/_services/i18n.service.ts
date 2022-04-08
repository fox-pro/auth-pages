import { Inject, Injectable } from '@angular/core';
import { DEFAULT_LANGUAGE, TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from './storage/local-storage';

const STORAGE_KEY = 'LANG';

export const LANGUAGES = {
  'en': 'English',
  'ko': '한국어',
};

@Injectable({providedIn: 'root'})
export class I18nService {
  private current = new BehaviorSubject<string>(this.defaultLanguage);

  constructor(
    private translateService: TranslateService,
    @Inject(DEFAULT_LANGUAGE) private defaultLanguage: string,
    private storageService: LocalStorageService,
  ) { }

  readonly current$ = this.current.asObservable();

  get currentValue(): string {
    return this.current.value;
  }

  init(): void {
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translateService.setDefaultLang(this.defaultLanguage);
    this.translateService.addLangs(Object.keys(LANGUAGES));

    this.current.next(this.getFromStorage() || this.translateService.getBrowserLang() || this.translateService.getDefaultLang());
    this.updateStorage();

    console.log(this.translateService.getDefaultLang());
    console.log(this.translateService.getBrowserLang());

    this.translateService.use(this.current.value);
  }

  switch(lang: string): void {
    if (this.translateService.getLangs().includes(lang)) {
      this.translateService.use(lang);
      this.current.next(lang);
      this.updateStorage();
    }
  }

  private getFromStorage(): string | null {
    return this.storageService.get<string>(STORAGE_KEY);
  }

  private updateStorage(): void {
    if (this.current.value !== this.translateService.getBrowserLang()) {
      this.storageService.set(STORAGE_KEY, this.current.value);
    } else {
      this.storageService.remove(STORAGE_KEY);
    }
  }
}