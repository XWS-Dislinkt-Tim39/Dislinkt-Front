import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NavbarNotRegisteredComponent } from './navbar-not-registered/navbar-not-registered.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    NavbarComponent,
    NavbarNotRegisteredComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule,
    AppRoutingModule,
  ],
  exports: [
    NavbarComponent,
    NavbarNotRegisteredComponent,
    SidebarComponent
  ]
})
export class SharedModule { }
