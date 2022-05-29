import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserEducation } from 'src/app/core/models/update-user-education.model';
import { UpdateUserExperience } from 'src/app/core/models/update-user-experience.model';
import { UserEducation } from 'src/app/core/models/user-education.model';
import { UserExperience } from 'src/app/core/models/user-experience.model';
import { User } from 'src/app/core/models/user.model';
import { JwtService } from 'src/app/core/services/jwt.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit {
  isIconPress: boolean = false;
  addForm: FormGroup;
  editForm: FormGroup;
  userId: any;
  selectedEducation: any = {
    id:"",
    userId: "",
    nameOfSchool: "",
    fieldOfStudy: "",
    startDate: new Date(),
    endDate: new Date(),
    description: ""
  }
  education: UserEducation= {
    userId: "",
    nameOfSchool: "",
    fieldOfStudy: "aaa",
    startDate: new Date(),
    endDate: new Date(),
    description: ""
  }
  editedEducation: UpdateUserEducation = {
    id:"",
    userId: "",
    nameOfSchool: "",
    fieldOfStudy: "aaa",
    startDate: new Date(),
    endDate: new Date(),
    description: ""
  }
  educations:any=[]
  startDate: Date = new Date();
  endDate: Date = new Date();
  startDateEdit: Date = new Date();
  endDateEdit: Date = new Date();

  @ViewChild('addEducation') addDialog!: TemplateRef<any>;
  @ViewChild('editEducation') editDialog!: TemplateRef<any>;

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private jwtService: JwtService,
    private profileService: ProfileService
  ) {
    this.userId = this.jwtService.getUserId();
    this.addForm = this.formBuilder.group({
      nameOfSchool: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['']
    });

    this.editForm = this.formBuilder.group({
      nameOfSchool: ['', Validators.required],
      fieldOfStudy: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {

    this.getAllEducations();
  }
  get addFormControl(): { [key: string]: AbstractControl; } { return this.addForm.controls; }
  get editFormControl(): { [key: string]: AbstractControl; } { return this.addForm.controls; }

  opetAddDialog(event: any) {
    event?.stopPropagation();
    const myTempDialog = this.dialog.open(this.addDialog);
    myTempDialog.afterClosed().subscribe((res) => {
      console.log({ res });
    });
  }
  opetEditDialog(event: any,row:UpdateUserExperience) {
    event?.stopPropagation();
    this.selectedEducation=row;
    this.editedEducation.id=row.id
    const myTempDialog = this.dialog.open(this.editDialog);
    this.setEditFields();
    myTempDialog.afterClosed().subscribe((res) => {
      console.log({ res });
    });
  }

  getAllEducations() {
    this.profileService.getAboutInfo(this.userId).subscribe(data => {
      this.educations=data.educations;
    }, error => {
      console.log(error.error);
      alert('Error! Try again');
    });
  }


  setEditFields(){
    this.editForm.get('nameOfSchool')?.setValue(this.selectedEducation.nameOfSchool);
    this.editForm.get('fieldOfStudy')?.setValue(this.selectedEducation.fieldOfStudy);
    this.startDateEdit=this.selectedEducation.startDate;
    this.endDateEdit=this.selectedEducation.endDate;
    this.editForm.get('description')?.setValue(this.selectedEducation.description);
  }
  addWorkExperience() {
    if (this.addForm.invalid) {
      return;
    }
    this.education.userId = this.userId;
    this.education.nameOfSchool = this.addForm.value.nameOfSchool;
    this.education.fieldOfStudy = this.addForm.value.fieldOfStudy;
    this.education.startDate = this.addForm.value.startDate;
    this.education.endDate = this.addForm.value.endDate;
    this.education.description = this.addForm.value.description;
    this.profileService.addEducation(this.education).subscribe(data => {
      alert('Sucessfully added new education');
      window.location.reload();
    }, error => {
      console.log(error.error);
      alert('Error! Try again');
    });
  }

  editWorkExperience(){
    this.editedEducation.userId=this.userId;
    this.editedEducation.nameOfSchool=this.editForm.value.nameOfSchool;
    this.editedEducation.fieldOfStudy=this.editForm.value.fieldOfStudy;
    this.editedEducation.startDate=this.startDateEdit;
    this.editedEducation.endDate=this.endDateEdit;
    this.editedEducation.description=this.editForm.value.description;
    console.log(this.editedEducation);

    this.profileService.editEducation(this.editedEducation).subscribe(data=>{
      alert('Successfully edited selected education');
      window.location.reload();
    },error=>{
        alert('Error! Try again!')
    })

  }

}
