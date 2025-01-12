import { Component, inject  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.page.html',
  styleUrl: './sidebar.page.scss'
})
export class SidebarPage {
  private router = inject(Router);

  goToPage(path: string) {
    this.router.navigate([path]);
  }
}
