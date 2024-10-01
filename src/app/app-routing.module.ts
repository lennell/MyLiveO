import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./pages/home/home.component";
import {RouterModule, Routes} from "@angular/router";
import {Page1Component} from "./pages/page1/page1.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: '', component: Page1Component},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
