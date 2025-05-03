import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface User {
  id: number;
  email: string;
  fullName: string;
  token?: string;
  userType: number;
}

export interface AuthResponse {
  id: number;
  email: string;
  fullName: string;
  token: string;
  success: boolean;
  message: string;
  userType: number;
}

export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  constructor(private http: HttpClient) {
    this.loadUserFromStorage();
  }
  
  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(response => {
        if (response.success) {
          this.setCurrentUser({
            id: response.id,
            email: response.email,
            fullName: response.fullName,
            token: response.token,
            userType: response.userType
          });
        }
      })
    );
  }
  
  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (response.success) {
          this.setCurrentUser({
            id: response.id,
            email: response.email,
            fullName: response.fullName,
            token: response.token,
            userType: response.userType
          });
        }
      })
    );
  }
  
  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
  
  private setCurrentUser(user: User): void {
    try {
      const userData = {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        token: user.token,
        userType: user.userType
      };
      localStorage.setItem('currentUser', JSON.stringify(userData));
      this.currentUserSubject.next(userData);
    } catch (e) {
      console.error('Error setting current user:', e);
      localStorage.removeItem('currentUser');
      this.currentUserSubject.next(null);
    }
  }
  
  private loadUserFromStorage(): void {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        if (user.token) {
          this.currentUserSubject.next(user);
        } else {
          console.warn('No token found in stored user data');
          localStorage.removeItem('currentUser');
          this.currentUserSubject.next(null);
        }
      } catch (e) {
        console.error('Error loading user from storage:', e);
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
      }
    }
  }
  
  get isLoggedIn(): boolean {
    return !!this.currentUserSubject.value;
  }
  
  get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }
  
  // Debug method to check authentication token
  getAuthToken(): string | null {
    const userJson = localStorage.getItem('currentUser');
    if (!userJson) {
      console.warn('No user data in localStorage');
      return null;
    }
    
    try {
      const user = JSON.parse(userJson);
      if (!user.token) {
        console.warn('User data exists but no token found');
        return null;
      }
      return user.token;
    } catch (e) {
      console.error('Error parsing user data:', e);
      return null;
    }
  }
}