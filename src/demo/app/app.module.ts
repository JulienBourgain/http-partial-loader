import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LanguageModule } from 'http-partial-loader';
import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageInternalService } from './language-internal.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports:      [
    BrowserModule,
    HttpClientModule,
    TranslateModule,
    LanguageModule.forRoot({lang: 'fr', prefix: './i18n/', suffix: '.json'})
  ],
  providers: [
    LanguageInternalService
  ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule {}
