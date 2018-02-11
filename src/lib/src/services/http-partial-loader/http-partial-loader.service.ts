import { TranslateLoader } from '@ngx-translate/core';
import { Inject, Injectable } from '@angular/core';
import { TranslateLoaderConfig, TranslateLoaderConfigToken } from '../../translate-loader.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/operator/first';
import { uniq } from '../../utils';

@Injectable()
export class HttpPartialLoader implements TranslateLoader {
  partials: { [key: string]: any } = {};
  partialKeys: string[] = [];

  constructor(
    private httpClient: HttpClient,
    @Inject(TranslateLoaderConfigToken) private translateLoaderConfig: TranslateLoaderConfig
  ) {}

  /**
   * Gets the translations from the server
   * @param lang
   * @returns Observable<any>
   */
  getTranslation(lang: string): Observable<any> {
    return this.getPartials(lang)
      .map(partials => partials.reduce((memo: any, partial: any) => {
        return {... memo, ...partial};
      }, {})).first();
  }

  getPartials(lang: string) {
    const partials$ = this.partialKeys.map((partialKey: any) => this.getPartial(lang, partialKey));
    return (partials$ && partials$.length) ? Observable.forkJoin(partials$) : Observable.of([]);
  }

  getPartial(lang: string, partialKey: string) {

    if (this.partials && this.partials[lang] && this.partials[lang][partialKey]) {
      return Observable.of(this.partials[lang][partialKey]);
    } else {
      return this.httpClient.get(`${this.translateLoaderConfig.prefix}/${lang}/${partialKey}${this.translateLoaderConfig.suffix}`)
        .map((res) => {
          this.partials[lang] = this.partials[lang] || {};
          return this.partials[lang][partialKey] = res;
        });
    }
  }

  addPartials(partials: string[]): Observable<any> {
    const partialsLength = this.partialKeys.length;
    this.partialKeys = uniq([... this.partialKeys, ...partials]);

    if (partialsLength !== this.partialKeys.length) {
      return Observable.of(true);
    } else {
      return Observable.throw(`Nothing was added to partials with this partials requested : [${partials}] and this partials already defined : [${this.partialKeys}]`);
    }
  }
}
