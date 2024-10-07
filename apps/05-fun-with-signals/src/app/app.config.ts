import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAngularQuery, QueryClient } from '@tanstack/angular-query-experimental';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideExperimentalZonelessChangeDetection(), provideHttpClient(), provideRouter(routes), provideAngularQuery(new QueryClient())],
};
