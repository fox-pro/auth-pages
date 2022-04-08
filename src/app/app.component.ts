import { Component } from '@angular/core';
import { I18nService } from './_services/i18n.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'KidsLoop';

  constructor(
    i18nService: I18nService,
  ) {
    i18nService.init();
  }
}
