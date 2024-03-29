import { UserPostsComponent } from './user-posts/user-posts.component';
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
import { SearchProfilesComponent } from './search-profiles/search-profiles.component';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AccountInfoComponent } from '../public/account-info/account-info.component';
import { AccountNavigationComponent } from '../public/account-navigation/account-navigation.component';
import { UserNavigationComponent } from './user-navigation/user-navigation.component';
import { UserExperienceComponent } from './user-experience/user-experience.component';
import { UserSkillsComponent } from './user-skills/user-skills.component';
import { UserEducationComponent } from './user-education/user-education.component';

@NgModule({
  declarations: [
    DashboardPageComponent,
    AddPostComponent,
    SearchProfilesComponent,
    UserProfileComponent,
    UserNavigationComponent,
    UserPostsComponent,
    UserExperienceComponent,
    UserSkillsComponent,
    UserEducationComponent
  ],
  entryComponents: [AddPostComponent, SearchProfilesComponent],
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
    MatToolbarModule,
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
  ],
  exports: [
    DashboardPageComponent,
    SearchProfilesComponent
  ]
})
export class DashboardModule { }
