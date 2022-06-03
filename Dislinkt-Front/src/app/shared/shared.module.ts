import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NavbarNotRegisteredComponent } from './navbar-not-registered/navbar-not-registered.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AppRoutingModule } from '../app-routing.module';
import { RegistrationConfirmComponent } from './registration-confirm/registration-confirm.component';
import { NotFoundComponent } from './not-found/not-found.component';



@NgModule({
  declarations: [
    NavbarComponent,
    NavbarNotRegisteredComponent,
    SidebarComponent,
    RegistrationConfirmComponent,
    NotFoundComponent,
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
