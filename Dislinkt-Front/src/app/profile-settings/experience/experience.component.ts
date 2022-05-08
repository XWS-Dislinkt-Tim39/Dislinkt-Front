import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  isIconPress: boolean = false;
  addForm: FormGroup;
  @ViewChild('addExperience') addDialog!: TemplateRef<any>;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog,) {
    this.addForm = this.formBuilder.group({
      companyName: [''],
      role: [''],
      startDate: [''],
      endDate: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
  }
  opetAddDialog(event: any) {
    event?.stopPropagation();
    const myTempDialog = this.dialog.open(this.addDialog);
    myTempDialog.afterClosed().subscribe((res) => {
      console.log({ res });
    });
    this.isIconPress = false;
  }

}
