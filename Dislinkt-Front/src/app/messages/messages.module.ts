
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
import { MessagesComponent } from './messages.component';
@NgModule({
    declarations: [
        MessagesComponent
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
    ]
})
export class MessagesModule { }
