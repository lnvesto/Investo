import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Покращена налагоджувальна інформація
  console.log(`Request to: ${req.url}`);
  
  // Get the auth token from localStorage
  const userJson = localStorage.getItem('currentUser');
  
  // Skip interceptor for login and register requests to avoid circular issues
  if (req.url.includes('/auth/login') || req.url.includes('/auth/register')) {
    return next(req);
  }
  
  if (userJson) {
    try {
      const user = JSON.parse(userJson);
      // Clone the request and add the authorization header
      if (user.token) {
        console.log(`Adding auth token to request: ${req.url}`);
        console.log(`Token: ${user.token.substring(0, 20)}...`); // Безпечний вивід частини токена
        
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${user.token}`
          }
        });
        return next(authReq);
      } else {
        console.warn(`No token found for user when making request to: ${req.url}`);
      }
    } catch (e) {
      console.error('Error parsing user data from localStorage:', e);
      localStorage.removeItem('currentUser');
    }
  } else {
    console.warn(`No user data in localStorage when making request to: ${req.url}`);
  }
  
  return next(req);
};