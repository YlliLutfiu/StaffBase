import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['email']) {
        this.email = params['email'];
      }
    });
    this.authService.onLogout();
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        if (response && response.accessToken) {
          this.authService.storeToken(response.accessToken);

          this.authService.storeUserData({
            userId: response.user.userId,
            username: response.user.username,
            email: response.user.email || '',
            userRole: response.user.role
          });
        }
        if (response.user.role == 'employee') {
          this.router.navigate(['/tasks']);
        } else {
        this.router.navigate(['/dashboard']);
        }
      },
      error: (err) => {
        console.error('Login error', err);
      },
    });
  }

  sendToRegister() {
    this.router.navigate(['/register'])
  }
}