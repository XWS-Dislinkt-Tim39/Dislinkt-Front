import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobService } from 'src/app/core/services/job.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  routeState: any;
  selectedJob:any;
  requirements:any[]=[];
  userId:any;
  allSkills:any[]=[]
  recommendedJobs:any[]=[];
  constructor( 
     private router: Router,
     private profileService:ProfileService,
     private jobService:JobService,
     private jwtService:JwtService,

    ) {
    this.routeState = this.router.getCurrentNavigation()?.extras.state;
    this.selectedJob = this.routeState;
   }

  ngOnInit(): void {
    this.userId = this.jwtService.getUserId();
    this.getAllSKills();
    this.getRecommendedJobs();
    this.profileService.getAboutInfo(this.selectedJob.publisherId).subscribe(data=>{
      if(this.selectedJob.seniority==0){
        this.selectedJob.seniority="Junior"
      }else if(this.selectedJob.seniority==1){
        this.selectedJob.seniority="Medior"
      }else if(this.selectedJob.seniority==2){
        this.selectedJob.seniority="Senior"
      }
      this.selectedJob.userFirstName=data.firstName;
      this.selectedJob.userLastName=data.lastName;
      this.selectedJob.address=data.address;
      this.selectedJob.city=data.city;
      this.selectedJob.country=data.country;
    },error=>{
      alert('Error!Try again!');
    })
  }

  getAllSKills(){
    this.profileService.getAllSkills().subscribe(data=>{
      this.allSkills=data;
      this.getRequirements();
    })
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

  getRequirements(){
    this.selectedJob.skills=[];
    this.selectedJob.requirements.forEach((element:any) => {
        this.allSkills.forEach(el => {
          if(element==el.id){
            this.selectedJob.skills.push(el.name)
          }
        });
    });
  }

  viewJob(selectedJob:any){
    this.router.navigate(['/job-details'], {
      state: selectedJob,
    });
  }

}
