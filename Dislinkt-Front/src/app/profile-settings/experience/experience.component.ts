import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserExperience } from 'src/app/core/models/user-experience.model';
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
  userId:any;
  experience: UserExperience = {
    userId: "",
    nameOfCompany: "",
    fieldOfWork: "",
    startDate: new Date(),
    endDate: new Date(),
    description: ""
  }
  startDate:Date=new Date();
  endDate:Date=new Date();

  @ViewChild('addExperience') addDialog!: TemplateRef<any>;

  constructor(private formBuilder: FormBuilder, 
    public dialog: MatDialog,
    private jwtService:JwtService,
    private profileService:ProfileService
    ) {

    this.addForm = this.formBuilder.group({
      nameOfCompany: ['', Validators.required],
      fieldOfWork: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      description: ['']
    });
  }

  ngOnInit(): void {
    this.userId=this.jwtService.getUserId();
  }
  get addFormControl(): { [key: string]: AbstractControl; } { return this.addForm.controls; }
  opetAddDialog(event: any) {
    event?.stopPropagation();
    const myTempDialog = this.dialog.open(this.addDialog);
    myTempDialog.afterClosed().subscribe((res) => {
      console.log({ res });
    });
    this.isIconPress = false;
  }

  addWorkExperience() {
    if (this.addForm.invalid) {
      return;
    }
    this.experience.userId=this.userId;
    this.experience.nameOfCompany=this.addForm.value.nameOfCompany;
    this.experience.fieldOfWork=this.addForm.value.fieldOfWork;
    this.experience.startDate=this.addForm.value.startDate;
    this.experience.endDate=this.addForm.value.endDate;
    this.experience.description=this.addForm.value.description;
    this.profileService.addWorkExperience(this.experience).subscribe(data=>{
      alert('Sucessfully added new work experience')
    }, error => {
      console.log(error.error);
      alert('Error! Try again');
    });
  }

}
