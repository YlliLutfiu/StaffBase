import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

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

  goToRegister() {
    this.router.navigate(['/register']);
  }
}
