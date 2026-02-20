import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.page.html',
  styleUrls: ['./sidebar.page.scss']
})
export class SidebarPage implements OnInit {
  private router = inject(Router);
  activePath: string = '';
  user: any;
  private authService= inject(AuthService);

  ngOnInit(): void {
    this.user = this.authService.getUserData();
  }

  constructor() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.activePath = this.router.url;
    });

    this.activePath = this.router.url;
  }

  goToPage(path: string) {
    this.router.navigate([path]);
  }

  isActive(path: string): boolean {
    return this.activePath === path;
  }
}
