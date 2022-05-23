import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindJobComponent } from './find-job/find-job.component';
import { ProfileNavigationComponent } from '../profile-settings/profile-navigation/profile-navigation.component';
import { SharedModule } from '../shared/shared.module';
import { ProfileSettingsModule } from '../profile-settings/profile-settings.module';
import { RouterModule } from '@angular/router';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    FindJobComponent
  ],
  entryComponents: [ ProfileNavigationComponent],
  imports: [
    CommonModule,
    SharedModule,
    ProfileSettingsModule,
    RouterModule,
    MatIconModule,
   ReactiveFormsModule,
   FormsModule,
   MatFormFieldModule,
   MatInputModule,
  ]
})
export class JobsModule { }
