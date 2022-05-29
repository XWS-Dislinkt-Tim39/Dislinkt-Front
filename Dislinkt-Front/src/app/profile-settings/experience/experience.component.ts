import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
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
  selectedExperience: UserExperience = {
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
  opetEditDialog(event: any,row:UserExperience) {
    event?.stopPropagation();
    this.selectedExperience=row;
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

}
