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
import { FindJobComponent } from './jobs/find-job/find-job.component';
import { MyJobsComponent } from './jobs/my-jobs/my-jobs.component';
import { JobDetailsComponent } from './jobs/job-details/job-details.component';
import { EducationComponent } from './profile-settings/education/education.component';
import { InterestsComponent } from './profile-settings/interests/interests.component';
import { ProfileEducationComponent } from './public/profile-education/profile-education.component';
import { RegistrationConfirmComponent } from './shared/registration-confirm/registration-confirm.component';
import { UserEducationComponent } from './dashboard/user-education/user-education.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { NoAuthGuard } from './auth/guards/no-auth.guard';
import { AccountComponent } from './profile-settings/account/account.component';
import { ChatComponent } from './chat/chat.component';
import { NotificationsComponent } from './profile-settings/notifications/notifications.component';
import { BusinessReportComponent } from './admin/business-report/business-report.component';
import { AdminReportComponent } from './profile-settings/admin-report/admin-report.component';
import { JobsComponent } from './profile-settings/jobs/jobs.component';

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
    path: 'registration-confirm/:id',
    component: RegistrationConfirmComponent
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
    path: 'profile-education',
    component: ProfileEducationComponent
  },
  {
    path: 'profile-skills',
    component: ProfileSkillsComponent
  },
  {
    path: 'dashboard',
    component: DashboardPageComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'dashboard-search-profiles',
    component: SearchProfilesComponent,
    canActivate: [NoAuthGuard],
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
    path: 'user-education',
    component: UserEducationComponent
  },
  {
    path: 'user-skills',
    component: UserSkillsComponent
  },
  {
    path: 'notificaations',
    component: NotificationsComponent
  },
  {
    path: 'report',
    component: AdminReportComponent
  },
  {
    path: 'jobs',
    component: JobsComponent
  },
  {
    path: 'account-update',
    component: AccountUpadateComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'account-experience',
    component: ExperienceComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'account-education',
    component: EducationComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'account-skills',
    component: SkillsComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'account-interests',
    component: InterestsComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'messages',
    component: MessagesComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'find-job',
    component: FindJobComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'my-jobs',
    component: MyJobsComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'job-details',
    component: JobDetailsComponent,
    canActivate: [NoAuthGuard],
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: '**',
    component: NotFoundComponent,
  }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
