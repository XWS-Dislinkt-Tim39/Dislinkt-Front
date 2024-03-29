import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AppSkill } from 'src/app/core/models/app-skill.model';
import { NewJobOffer } from 'src/app/core/models/new-job-offer.model';
import { Skill } from 'src/app/core/models/skill.model';
import { ConnectionService } from 'src/app/core/services/connection.service';
import { JobService } from 'src/app/core/services/job.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {
  form: FormGroup;
  userId: string = "";
  startDateTime: Date = new Date();
  endDateTime: Date = new Date();
  newJobOffer: NewJobOffer = {
    startDateTime: new Date(),
    endDateTime: new Date(),
    publisherId: "",
    positionName: "",
    description: "",
    dailyActivities: [''],
    requirements: [''],
    seniority: '',
    followersId: ['']
  }
  skill: AppSkill = {
    id: '',
    name: ''
  }
  seniority: any = '';
  activities: any[] = [];
  requirements: any[]=[];
  connections: any[] = [];
  seniorityList: any[] = ['Junior', 'Medior', 'Senior'];
  skills:any=[];
  requirementObjects:any[]=[];

  constructor(
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private jwtService: JwtService,
    private profileService:ProfileService,
    private connectionService: ConnectionService,
    private dialogRef: MatDialogRef<AddJobComponent>) {
    this.form = this.formBuilder.group({
      startDateTime: [''],
      endDateTime: [''],
      positionName: [''],
      description: [''],
      dailyActivities: [''],
      requirements: ['']
    });
  }
  get addForm(): { [key: string]: AbstractControl; } { return this.form.controls; }

  ngOnInit(): void {
    this.userId = this.jwtService.getUserId();
    this.getAllSkills();
    this.getMyConnections();
  }

  addActivity() {
    this.activities.push(this.form.value.dailyActivities);
    this.form.get('dailyActivities')?.setValue('');
  }

  getAllSkills(){
    this.profileService.getAllSkills().subscribe(data=>{
      this.skills=data;
    },error=>{
      alert('Error!')
    })
  }

  addRequirements() {
    this.requirements.push(this.skill.id);
    this.requirementObjects.push(this.skill);
    console.log(this.requirements)
    this.form.get('requirements')?.setValue('');
  }

  getMyConnections() {
    this.connectionService.getConnections(this.userId).subscribe(data => {
      if (data != null) {
        this.connections = data;
      }
    })
  }

  addJobOffer() {
    if (this.form.invalid) {
      return;
    }
    this.newJobOffer.startDateTime = this.startDateTime;
    this.newJobOffer.endDateTime = this.endDateTime;
    this.newJobOffer.publisherId = this.userId;
    this.newJobOffer.positionName = this.form.value.positionName;
    this.newJobOffer.description = this.form.value.description;
    this.newJobOffer.dailyActivities = this.activities;
    this.newJobOffer.requirements = this.requirements;
    alert(this.newJobOffer.requirements.length+' '+this.requirements.length)
    this.newJobOffer.followersId = this.connections;
    this.newJobOffer.seniority = this.seniority;
    console.log(this.newJobOffer)
    this.jobService.addJobOffer(this.newJobOffer).subscribe(data => {
      alert('Sucessfully added new job offer');
      window.location.reload();
    }, error => {
      console.log(error.error);
      alert('Error! Try again');
    });
  }
}
