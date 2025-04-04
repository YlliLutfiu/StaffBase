import { Component, inject, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { SidebarPage } from './sidebar/sidebar.page';
import { NavbarPage } from './navbar/navbar.page';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, SidebarPage, NavbarPage, CommonModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'frontend';
  hideSidebarAndNavbar = false;
  private router = inject(Router);

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideSidebarAndNavbar = ['/login', '/register'].includes(event.urlAfterRedirects);
      }
    });
  }
}
