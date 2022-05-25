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
import { MyJobsComponent } from './my-jobs/my-jobs.component';
import { AddJobComponent } from './add-job/add-job.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { JobDetailsComponent } from './job-details/job-details.component';



@NgModule({
  declarations: [
    FindJobComponent,
    MyJobsComponent,
    AddJobComponent,
    JobDetailsComponent
  ],
  entryComponents: [ ProfileNavigationComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
    RouterModule,
    MatSelectModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatGridListModule,
    MatDatepickerModule
  ]
})
export class JobsModule { }
