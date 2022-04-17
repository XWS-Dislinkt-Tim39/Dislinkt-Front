import { ProfilePostsComponent } from './public/profile-posts/profile-posts.component';
import { ProfileDetailsComponent } from './public/profile-details/profile-details.component';
import { ProfilesComponent } from './public/profiles/profiles.component';
import { HomeComponent } from './public/home/home.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './auth/sign-up/sign-up.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
