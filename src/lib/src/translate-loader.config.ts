import { InjectionToken } from '@angular/core';

export const TranslateLoaderConfigToken = new InjectionToken<string>('TranslateLoaderConfig');

export class TranslateLoaderConfig {
  constructor (
    public lang = 'en',
    public prefix = './assets/i18n/',
    public suffix = '.json'
  ) {}
}
