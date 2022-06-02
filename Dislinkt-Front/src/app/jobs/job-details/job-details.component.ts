import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
  routeState: any;
  selectedJob:any
  constructor( 
     private router: Router,
     private profileService:ProfileService
    ) {
    this.routeState = this.router.getCurrentNavigation()?.extras.state;
    this.selectedJob = this.routeState;
   }

  ngOnInit(): void {
    this.profileService.getAboutInfo(this.selectedJob.publisherId).subscribe(data=>{
      this.selectedJob.userFirstName=data.firstName;
      this.selectedJob.userLastName=data.lastName;
      this.selectedJob.address=data.address;
      this.selectedJob.city=data.city;
      this.selectedJob.country=data.country;
    },error=>{
      alert('Error!Try again!');
    })
  }

}
