import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarPage } from './sidebar/sidebar.page';
import { NavbarPage } from './navbar/navbar.page';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarPage, NavbarPage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
