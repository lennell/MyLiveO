import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  mobileNavOpen = false;
  constructor(private router: Router) {}

  isActive(url: string): boolean {
    return this.router.url === url;
  }
  getCurrentUrl(): string {
    return this.router.url;
  }

  toggleMobileSideMenu() {
    this.mobileNavOpen = !this.mobileNavOpen;

  }
}
