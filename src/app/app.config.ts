import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { setheaderInterceptor } from './core/interceptors/setheader/setheader-interceptor';
import { errorInterceptor } from './core/interceptors/erorr/erorr-interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { provideAnimations } from '@angular/platform-browser/animations';
import { spinnerInterceptor } from './core/interceptors/spinner/spinner-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes,withHashLocation()), provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch(),withInterceptors([setheaderInterceptor,errorInterceptor,spinnerInterceptor])),
    provideTranslateService({
      lang: 'en',
      fallbackLang: 'en',
      loader: provideTranslateHttpLoader({
        prefix: '/i18n/',
        suffix: '.json'
      })
   }),
    provideToastr(),
    provideAnimations(),
    importProvidersFrom(NgxSpinnerModule)
  ]
};
