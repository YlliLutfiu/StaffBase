import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [
    CommonModule,
  ],
  templateUrl: './navbar.page.html',
  styleUrl: './navbar.page.scss'
})
export class NavbarPage implements OnInit {
  private router = inject(Router);
  authService = inject(AuthService)
  username: string = '';

  ngOnInit() {
    this.username = this.authService.getUserData()?.username || '';
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  logout() {
    this.authService.onLogout();
  }
}
