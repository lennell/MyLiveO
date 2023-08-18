import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import {RouterOutlet} from "@angular/router";
import { Page1Component } from './pages/page1/page1.component';
import {FormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    Page1Component,
  ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        RouterOutlet,
        FormsModule,
    ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
