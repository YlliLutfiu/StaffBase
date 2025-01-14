import { Component, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  template: `
    <button (click)="logout()" class="logout-button">Logout</button>
  `,
  styles: [`
    .logout-button {
      background-color: #ff4d4d;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
    }
    .logout-button:hover {
      background-color: #ff1a1a;
    }
  `]
})
export class LogoutComponent {
  private router = inject(Router);
  private authService = inject(AuthService);

  logout(): void {
    this.authService.removeToken(); // Clear the token
    this.router.navigate(['/login']); // Redirect to the login page
  }
}
