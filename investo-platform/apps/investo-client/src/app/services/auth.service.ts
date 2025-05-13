import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, tap, catchError } from 'rxjs';
import { environment } from '../../environments/environment';
import { 
  AuthResponse, 
  LoginRequest, 
  RegisterRequest, 
  TokenPayload, 
  User,
  PasswordResetCodeResponse,
  PasswordResetVerifyResponse,
  TokenRefreshResponse,
  CLAIMS
} from '../models/auth.types';
import { ErrorHandlerService } from './error-handler.service';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/user`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private tokenExpirationTimer: any;
  
  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService,
    private cookieService: CookieService
  ) {
    this.loadUserFromStorage();
  }
  
  private decodeToken(token: string): TokenPayload {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));

      const payload = JSON.parse(jsonPayload);
      console.log('Raw token payload:', payload);

      return {
        [CLAIMS.NAME_IDENTIFIER]: payload[CLAIMS.NAME_IDENTIFIER],
        [CLAIMS.ROLE]: payload[CLAIMS.ROLE],
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        exp: payload.exp,
        iss: payload.iss,
        aud: payload.aud
      };
    } catch (e) {
      console.error('Error decoding token:', e);
      throw new Error('Invalid token format');
    }
  }

  private handleTokenError(error: any): void {
    console.error('Token operation failed:', error);
    this.errorHandler.handleError(error);
    this.logout();
  }
  
  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(response => {
        if (response.token) {
          const tokenPayload = this.decodeToken(response.token);
          
          const userData: User = {
            id: tokenPayload[CLAIMS.NAME_IDENTIFIER] || '',
            email: tokenPayload.email || '',
            FirstName: tokenPayload.firstName || '',
            LastName: tokenPayload.lastName || '',
            token: response.token,
            userTypeId: tokenPayload[CLAIMS.ROLE] === 'Investor' ? 1 : 2
          };
          
          localStorage.setItem('currentUser', JSON.stringify(userData));
          this.cookieService.setCookie('jwt', response.token, 1);
          
          this.currentUserSubject.next(userData);
          
          this.setupTokenRefresh();
        }
      }),
      catchError(error => {
        this.errorHandler.handleError(error);
        return throwError(() => error);
      })
    );
  }
  
  login(credentials: LoginRequest): Observable<AuthResponse> {
    console.log('Login attempt with credentials:', { email: credentials.email });
    
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        console.log('Login response:', response);
        
        if (response.token) {
          const tokenPayload = this.decodeToken(response.token);
          console.log('Decoded token payload:', tokenPayload);
          
          const userData: User = {
            id: tokenPayload[CLAIMS.NAME_IDENTIFIER] || '',
            email: tokenPayload.email || '',
            FirstName: tokenPayload.firstName || '',
            LastName: tokenPayload.lastName || '',
            token: response.token,
            userTypeId: tokenPayload[CLAIMS.ROLE] === 'Investor' ? 1 : 2
          };
          
          console.log('Created user data:', userData);
          
          localStorage.setItem('currentUser', JSON.stringify(userData));
          this.cookieService.setCookie('jwt', response.token, 1);
          
          this.currentUserSubject.next(userData);
          
          this.setupTokenRefresh();
          
          console.log('Login successful, user data stored');
        } else {
          console.warn('Login response missing token');
        }
      }),
      catchError(error => {
        console.error('Login error:', error);
        this.errorHandler.handleError(error);
        return throwError(() => error);
      })
    );
  }
  
  logout(): void {
    localStorage.removeItem('currentUser');
    this.cookieService.deleteCookie('jwt');
    this.currentUserSubject.next(null);
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }
  
  private loadUserFromStorage(): void {
    try {
      const token = this.getAuthToken();
      const userJson = localStorage.getItem('currentUser');
      
      if (userJson && token) {
        const user = JSON.parse(userJson);
        user.token = token; 
        this.currentUserSubject.next(user);
        this.setupTokenRefresh();
      } else {
        this.logout();
      }
    } catch (e) {
      console.error('Error loading user from storage:', e);
      this.errorHandler.handleError(e);
      this.logout();
    }
  }
  
  get isLoggedIn(): boolean {
    const token = this.getAuthToken();
    const user = this.currentUserSubject.value;
    return !!(token && user);
  }
  
  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
  
  getAuthToken(): string | null {
    const cookieToken = this.cookieService.getCookie('jwt');
    if (cookieToken) {
      console.log('Token found in cookie');
      return cookieToken;
    }

    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        if (user.token) {
          console.log('Token found in localStorage');
          return user.token;
        }
      } catch (e) {
        console.error('Error parsing user data from localStorage:', e);
        this.logout(); 
      }
    }
    
    console.warn('No token found in cookies or localStorage');
    return null;
  }
  
  requestPasswordResetCode(email: string): Observable<PasswordResetCodeResponse> {
    return this.http.post<PasswordResetCodeResponse>(`${this.apiUrl}/reset-password/request`, { email })
      .pipe(
        catchError(error => {
          this.errorHandler.handleError(error);
          return throwError(() => error);
        })
      );
  }

  verifyResetCode(email: string, resetCode: string): Observable<PasswordResetVerifyResponse> {
    return this.http.post<PasswordResetVerifyResponse>(`${this.apiUrl}/reset-password/verify`, {
      email,
      resetCode
    }).pipe(
      catchError(error => {
        this.errorHandler.handleError(error);
        return throwError(() => error);
      })
    );
  }

  confirmPasswordReset(newPassword: string, token: string): Observable<AuthResponse> {
    const headers = { Authorization: `Bearer ${token}` };
    
    return this.http.post<AuthResponse>(
      `${this.apiUrl}/reset-password/confirm`,
      { newPassword },
      { headers }
    ).pipe(
      catchError(error => {
        this.errorHandler.handleError(error);
        return throwError(() => error);
      })
    );
  }

  refreshToken(): Observable<TokenRefreshResponse> {
    const token = this.getAuthToken();
    if (!token) {
      return throwError(() => new Error('No authentication token available'));
    }

    return this.http.post<TokenRefreshResponse>(`${this.apiUrl}/refresh-token`, {}).pipe(
      tap(response => {
        if (response.success && response.token) {
          this.cookieService.setCookie('jwt', response.token, 1);
          
          const userJson = localStorage.getItem('currentUser');
          if (userJson) {
            try {
              const userData = JSON.parse(userJson);
              userData.token = response.token;
              localStorage.setItem('currentUser', JSON.stringify(userData));
              this.currentUserSubject.next(userData);
            } catch (e) {
              console.error('Error updating token in localStorage:', e);
              this.errorHandler.handleError(e);
            }
          }
        }
      }),
      catchError(error => {
        this.handleTokenError(error);
        return throwError(() => error);
      })
    );
  }

  setupTokenRefresh(): void {
    this.stopTokenRefresh();
    
    if (!this.getAuthToken()) {
      console.log('No token to refresh');
      return;
    }

    this.tokenExpirationTimer = setInterval(() => {
      this.refreshToken().subscribe({
        next: () => console.log('Token refreshed successfully'),
        error: (err) => {
          console.error('Failed to refresh token:', err);
          this.errorHandler.handleError(err);
          if (err.status === 401) {
            this.logout();
          }
        }
      });
    }, 20 * 60 * 1000);
  }

  stopTokenRefresh(): void {
    if (this.tokenExpirationTimer) {
      clearInterval(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
