import { DashboardModule } from './dashboard/dashboard.module';

import { PublicModule } from './public/public.module';
import { SharedModule } from './shared/shared.module';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { ProfileSettingsModule } from './profile-settings/profile-settings.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PublicModule,
    AuthModule,
    SharedModule,
    CommonModule,
    HttpClientModule,
    DashboardModule,
    ProfileSettingsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
