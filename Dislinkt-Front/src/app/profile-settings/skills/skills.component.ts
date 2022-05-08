import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  isIconPress: boolean = false;
  addForm: FormGroup;
  addSkillForm: FormGroup;
  @ViewChild('addSkillCategory') addDialog!: TemplateRef<any>;
  @ViewChild('addSkill') addSkillDialog!: TemplateRef<any>;
  categories: string[] = ['Technical skills', 'SOft skills'];
  constructor(private formBuilder: FormBuilder, public dialog: MatDialog) {
    this.addForm = this.formBuilder.group({
      category: [''],
    });
    this.addSkillForm = this.formBuilder.group({
      skill: [''],
    });
  }

  ngOnInit(): void {
  }

  opetAddCategoryDialog(event: any) {
    event?.stopPropagation();
    const myTempDialog = this.dialog.open(this.addDialog);
    myTempDialog.afterClosed().subscribe((res) => {
      console.log({ res });
    });
    this.isIconPress = false;
  }

  opetAddSkillDialog(event: any) {
    event?.stopPropagation();
    const myTempDialog = this.dialog.open(this.addSkillDialog);
    myTempDialog.afterClosed().subscribe((res) => {
      console.log({ res });
    });
    this.isIconPress = false;
  }

}
