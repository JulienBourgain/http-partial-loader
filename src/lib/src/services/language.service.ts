import {TranslateService} from '@ngx-translate/core';
import {HttpPartialLoader} from './http-partial-loader/http-partial-loader.service';
import {Observable} from 'rxjs/Observable';
import { Inject, Injectable } from '@angular/core';
import { TranslateLoaderConfig, TranslateLoaderConfigToken } from '../translate-loader.config';

@Injectable()
export class LanguageService {
  translateLoader: HttpPartialLoader;

  constructor(
    private translate: TranslateService,
    @Inject(TranslateLoaderConfigToken) private translateLoaderConfig: TranslateLoaderConfig
  ) {
    this.translateLoader = <HttpPartialLoader> translate.currentLoader;
    this.init();
  }

  init() {
    this.reloadLang(this.translateLoaderConfig.lang);
  }

  addPartials(partials: string[]) {
    this.translateLoader.addPartials(partials).subscribe(
      () => this.reloadLang(),
      error => console.log(error)
    );
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
