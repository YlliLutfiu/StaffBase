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
    return new Observable((observer) => {
      this.http.post(`${this.apiUrl}/login`, data).subscribe({
        next: (res: any) => {
          this.storeToken(res.accessToken);
          this.storeUserData(res.user);
          observer.next(res);
          observer.complete();
        },
        error: (err) => observer.error(err),
      });
    });
  }

  storeUserData(user: { userId: number; username: string; email?: string; userRole?: string }): void {
    this.cookieService.set('userData', JSON.stringify(user), { expires: 7, path: '/' });
  }

  getUserData(): { userId: number; username: string; email?: string; userRole?: string } | null {
    const data = this.cookieService.get('userData');
    return data ? JSON.parse(data) : null;
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

  onLogout(): void {
    this.cookieService.delete('accessToken');
    this.cookieService.delete('username');
    this.cookieService.delete('userData');
    this.router.navigate(['/login']);
  }
}
