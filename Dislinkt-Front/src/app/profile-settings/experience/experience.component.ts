import { CloseScrollStrategy } from '@angular/cdk/overlay';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserExperience } from 'src/app/core/models/update-user-experience.model';
import { UserExperience } from 'src/app/core/models/user-experience.model';
import { User } from 'src/app/core/models/user.model';
import { JwtService } from 'src/app/core/services/jwt.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { UserExperienceComponent } from 'src/app/dashboard/user-experience/user-experience.component';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {
  isIconPress: boolean = false;
  addForm: FormGroup;
  editForm: FormGroup;
  userId: any;
  selectedExperience: any = {
    id:"",
    userId: "",
    nameOfCompany: "",
    fieldOfWork: "",
    startDate: new Date(),
    endDate: new Date(),
    description: ""
  }
  experience: UserExperience = {
    userId: "",
    nameOfCompany: "",
    fieldOfWork: "aaa",
    startDate: new Date(),
    endDate: new Date(),
    description: ""
  }
  editedExperience: UpdateUserExperience = {
    id:"",
    userId: "",
    nameOfCompany: "",
    fieldOfWork: "aaa",
    startDate: new Date(),
    endDate: new Date(),
    description: ""
  }
  experiences:any=[]
  startDate: Date = new Date();
  endDate: Date = new Date();
  startDateEdit: Date = new Date();
  endDateEdit: Date = new Date();

  @ViewChild('addExperience') addDialog!: TemplateRef<any>;
  @ViewChild('editExperience') editDialog!: TemplateRef<any>;

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private jwtService: JwtService,
    private profileService: ProfileService
  ) {
    this.userId = this.jwtService.getUserId();
    this.addForm = this.formBuilder.group({
      nameOfCompany: ['', Validators.required],
      fieldOfWork: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['']
    });

    this.editForm = this.formBuilder.group({
      nameOfCompany: ['', Validators.required],
      fieldOfWork: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {

    this.getAllExperiences();
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
    this.selectedExperience=row;
    this.editedExperience.id=row.id
    const myTempDialog = this.dialog.open(this.editDialog);
    this.setEditFields();
    myTempDialog.afterClosed().subscribe((res) => {
      console.log({ res });
    });
  }

  getAllExperiences() {
    this.profileService.getAboutInfo(this.userId).subscribe(data => {
      this.experiences=data.workExperiences;
    }, error => {
      console.log(error.error);
      alert('Error! Try again');
    });
  }


  setEditFields(){
    this.editForm.get('nameOfCompany')?.setValue(this.selectedExperience.nameOfCompany);
    this.editForm.get('fieldOfWork')?.setValue(this.selectedExperience.fieldOfWork);
    this.startDateEdit=this.selectedExperience.startDate;
    this.endDateEdit=this.selectedExperience.endDate;
    this.editForm.get('description')?.setValue(this.selectedExperience.description);
  }
  addWorkExperience() {
    if (this.addForm.invalid) {
      return;
    }
    this.experience.userId = this.userId;
    this.experience.nameOfCompany = this.addForm.value.nameOfCompany;
    this.experience.fieldOfWork = this.addForm.value.fieldOfWork;
    this.experience.startDate = this.addForm.value.startDate;
    this.experience.endDate = this.addForm.value.endDate;
    this.experience.description = this.addForm.value.description;
    this.profileService.addWorkExperience(this.experience).subscribe(data => {
      alert('Sucessfully added new work experience');
      window.location.reload();
    }, error => {
      console.log(error.error);
      alert('Error! Try again');
    });
  }

  editWorkExperience(){
    this.editedExperience.userId=this.userId;
    this.editedExperience.nameOfCompany=this.editForm.value.nameOfCompany;
    this.editedExperience.fieldOfWork=this.editForm.value.fieldOfWork;
    this.editedExperience.startDate=this.startDateEdit;
    this.editedExperience.endDate=this.endDateEdit;
    this.editedExperience.description=this.editForm.value.description;
    console.log(this.editedExperience);

    this.profileService.editWorkExperience(this.editedExperience).subscribe(data=>{
      alert('uspjesno')
    },error=>{
        alert('Error! Try again!')
    })

  }

}
