import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';
import { provideToastr } from 'ngx-toastr';
import { provideAnimations } from '@angular/platform-browser/animations';
import { imageInterceptor } from './interceptors/image.interceptor';
import { mediaInterceptor } from './interceptors/media.interceptor';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { AuthEffects } from './store/auth/auth.effects';
import { authReducer } from './store/auth/auth.reducer';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient() , provideHttpClient(withInterceptors(
    [authInterceptor,
      imageInterceptor,
      mediaInterceptor,
    ]
)),
  provideToastr({
    positionClass: 'toast-center-right',
  }),provideAnimations(), provideStore({auth:authReducer }),
  provideEffects([AuthEffects ]),
]
};
