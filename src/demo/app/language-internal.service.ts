import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from 'http-partial-loader';

@Injectable()
export class LanguageInternalService {
  constructor(
    private translate: TranslateService,
    private languageService: LanguageService
  ) {}

  addPartials(partials: string[]) {
    return this.languageService.addPartials(partials);
  }

  getCurrent() {
    return this.translate.currentLang;
  }
}
