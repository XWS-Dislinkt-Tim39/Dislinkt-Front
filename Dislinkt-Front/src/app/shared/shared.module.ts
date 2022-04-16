import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NavbarNotRegisteredComponent } from './navbar-not-registered/navbar-not-registered.component';



@NgModule({
  declarations: [
    NavbarComponent,
    NavbarNotRegisteredComponent
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatIconModule
  ],
  exports: [
    NavbarComponent,
    NavbarNotRegisteredComponent
  ]
})
export class SharedModule { }
