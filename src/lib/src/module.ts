import { ModuleWithProviders, NgModule } from '@angular/core';

import { HttpPartialLoader } from './services/http-partial-loader/http-partial-loader.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateLoaderConfig, TranslateLoaderConfigToken } from './translate-loader.config';
import { LanguageService } from './services/language.service';

@NgModule({
  imports: [
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: HttpPartialLoader
      }
    })
  ],
})
export class LanguageModule {
  public static forRoot(translateLoaderConfig: TranslateLoaderConfig): ModuleWithProviders {
    return {
      ngModule: LanguageModule,
      providers: [
        {provide: TranslateLoaderConfigToken, useValue: translateLoaderConfig},
        LanguageService
      ]
    };
  }
}
