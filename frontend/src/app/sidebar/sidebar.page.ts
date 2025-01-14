import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.page.html',
  styleUrls: ['./sidebar.page.scss']
})
export class SidebarPage {
  private router = inject(Router);
  activePath: string = '';

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
