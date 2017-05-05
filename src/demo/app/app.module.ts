import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LibModule, TranslateLoaderConfig } from 'http-partial-loader';

import { AppComponent }  from './app.component';
import { HttpModule } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    TranslateModule,
    LibModule.forRoot(new TranslateLoaderConfig('./i18n/'))
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
