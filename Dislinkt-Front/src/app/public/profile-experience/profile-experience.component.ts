import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-experience',
  templateUrl: './profile-experience.component.html',
  styleUrls: ['./profile-experience.component.scss']
})
export class ProfileExperienceComponent implements OnInit {
  routeState: any;
  selectedProfile:any;
  experience:any=[]
  constructor( private router: Router) { 
    this.routeState = this.router.getCurrentNavigation()?.extras.state;
    this.selectedProfile = this.routeState;
  }
  ngOnInit(): void {
    this.getExperience()
  }
  getExperience(){
    this.experience=this.selectedProfile.workExperiences;
  }
}
