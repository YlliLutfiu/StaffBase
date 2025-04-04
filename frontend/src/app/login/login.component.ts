import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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
  private router = inject(Router)

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.removeToken();
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        if (response && response.accessToken) {
          this.authService.storeToken(response.accessToken);
          this.authService.storeUsername(response.username)
          console.log(response.username)
        }
        this.router.navigate(['/dashboard']);
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
