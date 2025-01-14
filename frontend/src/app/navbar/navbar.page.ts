import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
export class NavbarPage {
  private router = inject(Router);
  private authService = inject(AuthService)

  goToRegister() {
    this.router.navigate(['/register']);
  }

  logout() {
    this.authService.removeToken();
  }
}
