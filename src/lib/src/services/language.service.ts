import {TranslateService} from '@ngx-translate/core';
import {HttpPartialLoader} from './http-partial-loader/http-partial-loader.service';
import {Observable} from 'rxjs/Observable';
export class LanguageService {
  translateLoader: HttpPartialLoader;

  constructor(
    private translate: TranslateService
  ) {
    this.translateLoader = <HttpPartialLoader> translate.currentLoader;
    this.init();
  }

  init() {
    this.reloadLang('en');
  }

  addPartials(partials: string[]) {
    this.translateLoader.addPartials(partials);
    this.reloadLang();
  }

  reloadLang(lang = this.translate.currentLang): Observable<any> {
    this.translate.setDefaultLang(lang);
    this.translate.resetLang(lang);
    return this.translate.use(lang);
  }

  getCurrent() {
    return this.translate.currentLang;
  }
}
