import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {Competition} from "../../models/competition";

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
    console.log('a ' + this.mobileNavOpen);
    this.mobileNavOpen = !this.mobileNavOpen;
    console.log('b ' + this.mobileNavOpen);

  }
}
