import { inject } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn) {
    return true;
  }
  
  const currentUrl = router.getCurrentNavigation()?.initialUrl.toString();
  return router.createUrlTree(['/login'], { 
    queryParams: { returnUrl: currentUrl }
  });
};