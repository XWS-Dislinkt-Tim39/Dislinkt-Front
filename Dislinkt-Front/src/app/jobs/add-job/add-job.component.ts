import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NewJobOffer } from 'src/app/core/models/new-job-offer.model';
import { JobService } from 'src/app/core/services/job.service';
import { JwtService } from 'src/app/core/services/jwt.service';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {
  form: FormGroup;
  userId: string = "";
  newJobOffer: NewJobOffer= {
    publisherId: "",
    positionName: "",
    description: "",
    dailyActivities: "",
    requirements: ""
  }
  constructor(  
    private formBuilder: FormBuilder,
    private jobService: JobService,
    private jwtService : JwtService,
    private dialogRef: MatDialogRef<AddJobComponent>) 
    { 
    this.form = this.formBuilder.group({
      positionName: [''],
      description: [''],
      dailyActivities: [''],
      requirements: ['']
    });
  }

  ngOnInit(): void {
    this.userId = this.jwtService.getUserId()
  }
  addWorkExperience() {
    if (this.form.invalid) {
      return;
    }
    this.newJobOffer.publisherId = this.userId;
    this.newJobOffer.positionName = this.form.value.positionName;
    this.newJobOffer.description = this.form.value.description;
    this.newJobOffer.dailyActivities = this.form.value.dailyActivities;
    this.newJobOffer.requirements = this.form.value.requirements;
    this.jobService.addJobOffer(this.newJobOffer).subscribe(data => {
      alert('Sucessfully added new education');
      window.location.reload();
    }, error => {
      console.log(error.error);
      alert('Error! Try again');
    });
  }
}
