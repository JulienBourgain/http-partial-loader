import { get, map, reduce, assign, concat, uniq } from 'lodash';
import { Http } from '@angular/http';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import {Inject, Injectable} from '@angular/core';
import {TranslateLoaderConfig, TranslateLoaderConfigToken} from '../../translate-loader.config';

@Injectable()
export class HttpPartialLoader implements TranslateLoader {
  partials: { [key: string]: any } = {};
  partialKeys: string[] = [];

  constructor(
    private http: Http,
    @Inject(TranslateLoaderConfigToken) private translateLoaderConfig: TranslateLoaderConfig
  ) {}

  /**
   * Gets the translations from the server
   * @param lang
   * @returns {any}
   */
  getTranslation(lang: string) {
    return this.getPartials(lang)
      .map(partials => reduce(partials, (memo: any, partial: any) => {
        return assign(memo, partial);
      }, {}));
  }

  getPartials(lang: string) {
    return Observable.forkJoin(map(this.partialKeys, (partialKey: any) => this.getPartial(lang, partialKey)));
  }

  getPartial(lang: string, partialKey: string) {
    const partial = get(this.partials, `${lang}.${partialKey}`);
    if (partial) {
      return Observable.of(partial);
    } else {
      return this.http.get(`${this.translateLoaderConfig.prefix}/${lang}/${partialKey}${this.translateLoaderConfig.suffix}`)
        .map((res) => res.json())
        .map((res) => {
          this.partials[lang] = this.partials[lang] || {};
          return this.partials[lang][partialKey] = res;
        });
    }
  }

  addPartials(partials: string[]): void {
    this.partialKeys = uniq(concat(this.partialKeys, partials));
  }
}
