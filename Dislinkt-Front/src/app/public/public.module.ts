import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { ProfilesComponent } from './profiles/profiles.component';
import { MatSelectModule } from '@angular/material/select';



@NgModule({
  declarations: [
    HomeComponent,
    ProfilesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    RouterModule,
    MatSelectModule
  ],
  exports: [
    HomeComponent,
    ProfilesComponent
  ]
})
export class PublicModule { }
