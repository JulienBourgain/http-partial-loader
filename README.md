# julienbourgain/http-partial-loader [![Build Status](https://travis-ci.org/JulienBourgain/http-partial-loader.svg?branch=master)](https://travis-ci.org/JulienBourgain/http-partial-loader) [![npm version](https://img.shields.io/npm/v/julienbourgain/http-partial-loader.svg)](https://www.npmjs.com/package/julienbourgain/http-partial-loader)

A loader for [ngx-translate](https://github.com/ngx-translate/core) that loads translation using http.

Get the complete changelog here: https://github.com/julienbourgain/http-partial-loader/releases

* [Installation](#installation)
* [Usage](#usage)

## Installation

We assume that you already installed [ngx-translate](https://github.com/ngx-translate/core).

Now you need to install the npm module for `TranslateHttpPartialLoader`:

```sh
npm install julienbourgain/http-partial-loader --save
```

## Usage

#### 1. Setup the `TranslateModule` to use the `TranslateHttpPartialLoader`:

The `TranslateHttpPartialLoader` uses Http to load translations, which means that you have to import the HttpModule from `@angular/http` before the `TranslateModule`:

```ts
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpModule, Http} from '@angular/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpPartialLoader} from 'julienbourgain/http-partial-loader';
import {AppComponent} from "./app";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpPartialLoader(http);
}

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        LanguageModule.forRoot({prefix: './i18n/', suffix: '.json'})
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

The `TranslateHttpPartialLoader` also has two optional parameters:
- prefix: string = "/assets/i18n/"
- suffix: string = ".json"

By using those default parameters, it will load your translations files for the lang "en" from: `/assets/i18n/en.json`.

You can change those in the `HttpLoaderFactory` method that we just defined. For example if you want to load the "en" translations from `/public/lang-files/en-lang.json` you would use:

```ts
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpPartialLoader(http, "/public/lang-files/", "-lang.json");
}
```

For now this loader only support the json format.

Because `ngx-translate` doesn't target partial translations, we need to inform the partialLoader witch parts of the current language translation load.
When you split translation in multiple translation files, one ngx page, need 0, 1 or many translation parts.

So to do this with @angular/router for example, you need to add a resolver to your routes


```ts
@Injectable()
export class TranslatePartialResolver implements Resolve<any> {
  constructor(private translateConfig: TranslateConfig) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) 
    switch ((<Type<any>>route.component).name) {
      case AppComponent.name:
        return this.translateConfig.addPartials(['global', 'toastr']);
      case LoginComponent.name:
        return this.translateConfig.addPartials(['login']);
    }
  }
}
```

And you just add the resolver in your routes like : 

```ts
{
  path     : 'app',
  component: AppComponent,
  resolve: {
    translatePartialLoader: TranslatePartialResolver
  }
}
```

Currently you cannot remove partials to load when you change the language, because it's difficult to know if a translation is in use or not.
Also, translation parts adding needs to reload the language. And we cache already loaded parts.

For this reasons, translateService.reloadLang('en') doesn't works with this loader.
But I invite you to use julienbourgain/partial-translate-ott to have a more friendly API :)
