import { HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const imageInterceptor: HttpInterceptorFn = (req, next) => {
  const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg'];

  if (req.body instanceof FormData) {
    const file = req.body.get('file'); 

    if (file instanceof File) {
      if (!allowedImageTypes.includes(file.type)) {
        return throwError(() => new Error('❌ Type d\'image non autorisé'));
      }
    }
  }

  return next(req).pipe(
    catchError((error) => {
      console.error('Erreur dans l\'intercepteur image:', error);
      return throwError(() => error);
    })
  );
};
