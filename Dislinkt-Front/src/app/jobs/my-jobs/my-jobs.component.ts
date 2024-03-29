import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { JobService } from 'src/app/core/services/job.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { ProfileDetailsComponent } from 'src/app/public/profile-details/profile-details.component';
import { AddJobComponent } from '../add-job/add-job.component';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.scss']
})
export class MyJobsComponent implements OnInit {
  dilogRef: any;
  routeState: any;
  selectedJob:any;
  jobsCount:any=1;
  userId: string = "";
  jobs: any[] = [];
  recommendedJobs:any[]=[];
  constructor(public dialog: MatDialog, 
    private jobService: JobService, 
    private jwtService: JwtService,
    private profileService:ProfileService,
    private router: Router) { }

  ngOnInit(): void {
    this.userId = this.jwtService.getUserId();
    this.getRecommendedJobs();
    this.findAllByUser();
    
  }
  openAddDialog(event: { stopPropagation: () => void; }) {
    this.dilogRef = this.dialog.open(AddJobComponent, {
      data: {
      }
    });
  }
  findAllByUser(){this.jobService.getAllByUser(this.userId).subscribe(data => {
    this.jobs=data;
    this.jobsCount=this.jobs.length;
    this.jobs.forEach((value, i: any) => {
    this.profileService.getAboutInfo(value.publisherId).subscribe(data => {
      value.userFirstName = data.firstName;
      value.userLastName = data.lastName;
      value.city = data.city;
      value.country = data.country;
      value.gender = data.gender;
    })
  });
  }, 
  error => {
    console.log(error.error);
    alert('Error! Try again');
  });
}

getRecommendedJobs(){
  this.jobService.getRecommendedJobs(this.userId).subscribe(data=>{
    data.forEach((el:any) => {
      if(el.publisherId!=this.userId)
          this.recommendedJobs.push(el);
    });
    console.log(data)
  },error=>{
  })
}


viewJob(selectedJob:any){
  this.router.navigate(['/job-details'], {
    state: selectedJob,
  });
}

}
