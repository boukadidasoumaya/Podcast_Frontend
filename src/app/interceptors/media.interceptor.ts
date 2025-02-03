import { HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const mediaInterceptor: HttpInterceptorFn = (req, next) => {
  const allowedMediaTypes = ['audio/mp3', 'audio/mpeg', 'video/mp4'];

  if (req.body instanceof FormData) {
    const file = req.body.get('file'); 

    if (file instanceof File) {
      if (!allowedMediaTypes.includes(file.type)) {
        return throwError(() => new Error('❌ Type de média non autorisé'));
      }
    }
  }

  return next(req).pipe(
    catchError((error) => {
      console.error('Erreur dans l\'intercepteur Média:', error);
      return throwError(() => error);
    })
  );
};
