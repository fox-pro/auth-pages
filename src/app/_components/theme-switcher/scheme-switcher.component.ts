import { ChangeDetectionStrategy, Component, HostBinding, HostListener } from '@angular/core';

import { ColorScheme, SchemeService } from 'src/app/_services/scheme.service';

const enum SwitcherClass {
  DARK = 'dark',
  LIGHT = 'light',
}

@Component({
  selector: 'app-scheme-switcher',
  template: '',
  styleUrls: ['./scheme-switcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchemeSwitcherComponent {
  @HostBinding('class')
  class = this.getSwitcherClass();

  constructor(
    private schemeService: SchemeService,
  ) { }

  @HostListener('click')
  switch(): void {
    this.schemeService.switch();
    this.class = this.getSwitcherClass();
  }

  private getSwitcherClass(): SwitcherClass {
    return this.schemeService.current === ColorScheme.LIGHT ? SwitcherClass.DARK : SwitcherClass.LIGHT;
  }
}
