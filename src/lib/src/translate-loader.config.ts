import { InjectionToken } from '@angular/core';

export const TranslateLoaderConfigToken = new InjectionToken<string>('TranslateLoaderConfig');

export class TranslateLoaderConfig {
  constructor (
    public prefix = './assets/i18n/',
    public suffix = '.json',
  ) {}
}
