import { APP_INITIALIZER } from '@angular/core';
import { AuthService } from '../services/auth.service';

export function setupAuthInitializer(authService: AuthService) {
  return () => {
    console.log('Setting up auth token refresh');
    if (authService.isLoggedIn) {
      authService.setupTokenRefresh();
    }
    return Promise.resolve();
  };
}
export const authInitializerProvider = {
  provide: APP_INITIALIZER,
  useFactory: setupAuthInitializer,
  deps: [AuthService],
  multi: true
};

