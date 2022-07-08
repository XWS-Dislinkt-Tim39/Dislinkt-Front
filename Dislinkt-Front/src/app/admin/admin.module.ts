import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BusinessReportComponent } from './business-report/business-report.component';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { PublicModule } from '../public/public.module';
import { SharedModule } from '../shared/shared.module';
import { ProfileNavigationComponent } from '../profile-settings/profile-navigation/profile-navigation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { Chart } from 'chart.js';


@NgModule({
  declarations: [
    BusinessReportComponent
  ],
  imports: [
        CommonModule,
        SharedModule,
        PublicModule,
        MatIconModule,
        MatDialogModule,
        MatFormFieldModule,
        MatToolbarModule,
        CommonModule,
        SharedModule,
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
        FormsModule,
        ReactiveFormsModule,
        NgChartsModule,
        Chart
  ]
})
export class AdminModule { }
