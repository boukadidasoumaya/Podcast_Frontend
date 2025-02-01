import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { imageInterceptor } from './interceptors/image.interceptor';
import { mediaInterceptor } from './interceptors/media.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient() , provideHttpClient(withInterceptors(
    [authInterceptor,
      imageInterceptor, 
      mediaInterceptor,
    ]
)),
  provideToastr({
    positionClass: 'toast-top-right',
  }), provideAnimationsAsync(),]
};
