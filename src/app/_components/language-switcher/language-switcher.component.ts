import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';

import { I18nService, LANGUAGES } from 'src/app/_services/i18n.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageSwitcherComponent implements OnInit {
  switcherOpen = false;

  current = this.i18nService.currentValue;

  languages = LANGUAGES;

  private isClickInside = false;

  constructor(
    private i18nService: I18nService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.i18nService.current$
      .subscribe((lang) => {
          this.current = lang;
          this.cdr.markForCheck();
      })
  }

  @HostListener('click')
  clickInside() {
    this.isClickInside = true;
  }

  @HostListener('document:click')
  clickOutside() {
    if (!this.isClickInside && this.switcherOpen) {
      this.switcherOpen = false;
    }
    this.isClickInside = false;
  }

  openSwitcher(): void {
    this.switcherOpen = true;
  }

  switch(lang: string): void {
    this.switcherOpen = false;
    if (lang === this.current) {
      return;
    }
    this.i18nService.switch(lang);
  }
}
