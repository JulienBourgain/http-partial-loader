import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LanguageModule } from 'http-partial-loader';

import { AppComponent }  from './app.component';
import { HttpModule } from '@angular/http';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageInternalService } from './language-internal.service';

@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    TranslateModule,
    LanguageModule.forRoot({prefix: './i18n/', suffix: '.json'})
  ],
  providers: [
    LanguageInternalService
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {}
