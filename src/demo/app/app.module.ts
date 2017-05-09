import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LanguageModule, TranslateLoaderConfig } from 'http-partial-loader';

import { AppComponent }  from './app.component';
import { HttpModule } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    TranslateModule,
    LanguageModule.forRoot(new TranslateLoaderConfig('./i18n/'))
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
