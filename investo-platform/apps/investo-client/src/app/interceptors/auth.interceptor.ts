import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LoadingService } from '../services/loading.service';
import { ErrorHandlerService } from '../services/error-handler.service';
import { catchError, finalize, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const loadingService = inject(LoadingService);
  const errorHandler = inject(ErrorHandlerService);
  
  if (req.url.includes('/login') || req.url.includes('/register')) {
    return next(req);
  }
  
  loadingService.show();
  
  const token = authService.getAuthToken();
  
  if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    
    return next(authReq).pipe(
      finalize(() => loadingService.hide()),
      catchError(error => {
        if (error.status === 401) {
          authService.logout();
        }
        errorHandler.handleError(error);
        return throwError(() => error);
      })
    );
  }
  
  console.warn(`No auth token available when making request to: ${req.url}`);
  loadingService.hide();
  
  return next(req).pipe(
    finalize(() => loadingService.hide())
  );
};