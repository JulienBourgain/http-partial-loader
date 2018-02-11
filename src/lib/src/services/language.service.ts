import { TranslateService } from '@ngx-translate/core';
import { HttpPartialLoader } from './http-partial-loader/http-partial-loader.service';
import { Observable } from 'rxjs/Observable';
import { Inject, Injectable } from '@angular/core';
import { TranslateLoaderConfig, TranslateLoaderConfigToken } from '../translate-loader.config';
import { tap } from 'rxjs/operators/tap';

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
    this.reloadLang(this.translateLoaderConfig.lang).subscribe();
  }

  addPartials(partials: string[]) {
    this.translateLoader.addPartials(partials)
      .switchMap(() => this.reloadLang())
      .subscribe(
      () => {},
      error => console.error(error)
    );
  }

  reloadLang(lang = this.translate.currentLang): Observable<any> {
    this.translate.use(lang);
    return this.translateLoader.getTranslation(lang)
      .pipe(tap(res => this.translate.setTranslation(lang, res)));
  }

  getCurrent() {
    return this.translate.currentLang;
  }
}
