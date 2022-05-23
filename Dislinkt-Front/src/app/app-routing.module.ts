import { SkillsComponent } from './profile-settings/skills/skills.component';
import { ExperienceComponent } from './profile-settings/experience/experience.component';
import { AccountUpadateComponent } from './profile-settings/account-upadate/account-upadate.component';
import { UserSkillsComponent } from './dashboard/user-skills/user-skills.component';
import { UserExperienceComponent } from './dashboard/user-experience/user-experience.component';
import { UserPostsComponent } from './dashboard/user-posts/user-posts.component';
import { UserProfileComponent } from './dashboard/user-profile/user-profile.component';
import { SearchProfilesComponent } from './dashboard/search-profiles/search-profiles.component';
import { DashboardPageComponent } from './dashboard/dashboard-page/dashboard-page.component';

import { ProfileSkillsComponent } from './public/profile-skills/profile-skills.component';
import { ProfileExperienceComponent } from './public/profile-experience/profile-experience.component';
import { ProfilePostsComponent } from './public/profile-posts/profile-posts.component';
import { ProfileDetailsComponent } from './public/profile-details/profile-details.component';
import { ProfilesComponent } from './public/profiles/profiles.component';
import { HomeComponent } from './public/home/home.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { MessagesComponent } from './messages/messages.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'search-profiles',
    component: ProfilesComponent
  },
  {
    path: 'profile-details',
    component: ProfileDetailsComponent
  },
  {
    path: 'profile-posts',
    component: ProfilePostsComponent
  },
  {
    path: 'profile-experience',
    component: ProfileExperienceComponent
  },
  {
    path: 'profile-skills',
    component: ProfileSkillsComponent
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent
  },
  {
    path: 'dashboard-search-profiles',
    component: SearchProfilesComponent
  },
  {
    path: 'user-profile',
    component: UserProfileComponent
  },
  {
    path: 'user-posts',
    component: UserPostsComponent
  },
  {
    path: 'user-experience',
    component: UserExperienceComponent
  },
  {
    path: 'user-skills',
    component: UserSkillsComponent
  },
  {
    path: 'account-update',
    component: AccountUpadateComponent
  },
  {
    path: 'account-experience',
    component: ExperienceComponent
  },
  {
    path: 'account-skills',
    component: SkillsComponent
  },
  {
    path: 'messages',
    component: MessagesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
