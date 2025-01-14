import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/auth';
  private router = inject(Router)
  
  constructor(private http: HttpClient, private cookieService: CookieService) {}

  register(data: { username: string; email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, data);
  }

  storeToken(token: string): void {
    this.cookieService.set('accessToken', token, { expires: 7, path: '/', sameSite: 'None', secure: true });
  }

  storeUsername(username: string): void {
    this.cookieService.set('username', username, { expires: 7, path: '/' });
  }

  getUsername(): string | null {
    return this.cookieService.get('username');
  }

  getToken(): string | null {
    return this.cookieService.get('accessToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  removeToken(): void {
    this.cookieService.delete('accessToken');
    this.cookieService.delete('username');
    this.router.navigate(['/login']);
  }
}
