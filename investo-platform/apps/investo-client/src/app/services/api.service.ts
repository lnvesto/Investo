import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from '../../environments/environment';
import { CookieService } from './cookie.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = `${environment.apiUrl}`; 

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  private getHeaders(): HttpHeaders {
    const token = this.cookieService.getCookie('jwt');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  
  register(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/register`, userData).pipe(
      tap((response: any) => {
        if (response.token) {
          this.cookieService.setCookie('jwt', response.token, 1); 
        }
        if (response.refreshToken) {
          localStorage.setItem('refreshToken', response.refreshToken);
        }
      })
    );
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/login`, credentials).pipe(
      tap((response: any) => {
        if (response.token) {
          this.cookieService.setCookie('jwt', response.token, 1); 
        }
        if (response.refreshToken) {
          localStorage.setItem('refreshToken', response.refreshToken);
        }
      })
    );
  }

  logout(): void {
    this.cookieService.deleteCookie('jwt');
    localStorage.removeItem('refreshToken');
  }

  
  getUserProfile(id: string): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/profile/${id}`, { headers: this.getHeaders() });
  }

  getMyProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/user/profile`, { headers: this.getHeaders() });
  }

  updateProfile(profileData: Partial<User>): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/user/profile`, profileData, { headers: this.getHeaders() });
  }
}