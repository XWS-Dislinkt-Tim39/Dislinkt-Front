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
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { AccountInfoComponent } from './account-info/account-info.component';
import { AccountNavigationComponent } from './account-navigation/account-navigation.component';
import { ProfilePostsComponent } from './profile-posts/profile-posts.component';
import { ProfileExperienceComponent } from './profile-experience/profile-experience.component';



@NgModule({
  declarations: [
    HomeComponent,
    ProfilesComponent,
    ProfileDetailsComponent,
    AccountInfoComponent,
    AccountNavigationComponent,
    ProfilePostsComponent,
    ProfileExperienceComponent
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
    MatSelectModule,
    MatTabsModule,
    MatButtonToggleModule,
    MatGridListModule
  ],
  exports: [
    HomeComponent,
    ProfilesComponent
  ]
})
export class PublicModule { }
