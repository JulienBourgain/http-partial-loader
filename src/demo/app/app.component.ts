import { Component, OnInit } from '@angular/core';
import { TranslateLoader, TranslateService } from '@ngx-translate/core';
import { HttpPartialLoader } from 'http-partial-loader';
import { LanguageInternalService } from './language-internal.service';

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
    private languageInternalService: LanguageInternalService
  ) {}

  ngOnInit() {
    this.languageInternalService.addPartials(['demo']);


    setTimeout(() => {
      this.languageInternalService.addPartials(['async']);
    }, 2000);
  }
}
