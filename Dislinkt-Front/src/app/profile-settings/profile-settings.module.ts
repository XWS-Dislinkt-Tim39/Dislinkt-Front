import { ProfileNavigationComponent } from './profile-navigation/profile-navigation.component';
import { AccountUpadateComponent } from './account-upadate/account-upadate.component';

import { MatIconModule } from '@angular/material/icon';
import { PublicModule } from './../public/public.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatGridListModule } from '@angular/material/grid-list';
import { AccountInfoComponent } from '../public/account-info/account-info.component';
import { AccountNavigationComponent } from '../public/account-navigation/account-navigation.component';
import { ExperienceComponent } from './experience/experience.component';
import { SkillsComponent } from './skills/skills.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { EducationComponent } from './education/education.component';
import { InterestsComponent } from './interests/interests.component';
import { AccountComponent } from './account/account.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NotificationsComponent } from './notifications/notifications.component';
import {MatBadgeModule} from '@angular/material/badge';


@NgModule({
    declarations: [
        AccountUpadateComponent,
        ProfileNavigationComponent,
        ExperienceComponent,
        SkillsComponent,
        EducationComponent,
        InterestsComponent,
        AccountComponent,
        NotificationsComponent
    ],
    entryComponents: [],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
        PublicModule,
        MatIconModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatFormFieldModule,
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
        MatDatepickerModule,
        MatSlideToggleModule,
        MatBadgeModule
    ],
    exports: [
        ProfileNavigationComponent,
    ]
})
export class ProfileSettingsModule { }
