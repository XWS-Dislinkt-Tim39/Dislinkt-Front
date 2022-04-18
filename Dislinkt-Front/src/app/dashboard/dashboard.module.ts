import { MatIconModule } from '@angular/material/icon';
import { PublicModule } from './../public/public.module';
import { SharedModule } from './../shared/shared.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPostComponent } from './add-post/add-post.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [
    DashboardPageComponent,
    AddPostComponent
  ],
  entryComponents: [AddPostComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PublicModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatToolbarModule
  ],
  exports: [
    DashboardPageComponent
  ]
})
export class DashboardModule { }
