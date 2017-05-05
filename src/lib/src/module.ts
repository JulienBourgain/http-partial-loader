import {ModuleWithProviders, NgModule} from '@angular/core';

import { HttpPartialLoader } from './services/http-partial-loader/http-partial-loader.service';
import {HttpModule} from '@angular/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateLoaderConfig, TranslateLoaderConfigToken} from './translate-loader.config';

@NgModule({
  imports: [
    HttpModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: HttpPartialLoader
      }
    })
  ],
})
export class LibModule {
  public static forRoot(translateLoaderConfig: TranslateLoaderConfig): ModuleWithProviders {
    return {
      ngModule: LibModule,
      providers: [
        {provide: TranslateLoaderConfigToken, useValue: translateLoaderConfig}
      ]
    };
  }
}
