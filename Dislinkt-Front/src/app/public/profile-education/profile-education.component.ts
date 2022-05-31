import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-education',
  templateUrl: './profile-education.component.html',
  styleUrls: ['./profile-education.component.scss']
})
export class ProfileEducationComponent implements OnInit {
  routeState: any;
  selectedProfile:any;
  educations:any[]=[];
  constructor( private router: Router) { 
    this.routeState = this.router.getCurrentNavigation()?.extras.state;
    this.selectedProfile = this.routeState;
  }

  ngOnInit(): void {
    this.getEducation()
  }
  getEducation(){
    this.educations=this.selectedProfile.educations;
  }
  

}
