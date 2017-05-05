import { Component, OnInit } from '@angular/core';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpPartialLoader } from 'http-partial-loader';

@Component({
  selector: 'demo-app',
  template: `
    <h1>{{ 'HELLO' | translate }}</h1>
    <h1>{{ 'async' | translate }}</h1>
  `,
})
export class AppComponent implements OnInit {
  param = {value: 'world'};

  constructor(
    private translate: TranslateService,
    private translateLoader: TranslateLoader
  ) {}

  ngOnInit() {
    (<HttpPartialLoader> this.translateLoader).addPartials(['demo']);
    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    this.translate.use('en');

    setTimeout(() => {
      (<HttpPartialLoader> this.translateLoader).addPartials(['async']);
      this.reloadLang();
    }, 2000);
  }

  reloadLang() {
    let lang = this.translate.currentLang;
    this.translate.setDefaultLang(lang);
    this.translate.resetLang(lang);
    this.translate.use(lang);
  }
}
