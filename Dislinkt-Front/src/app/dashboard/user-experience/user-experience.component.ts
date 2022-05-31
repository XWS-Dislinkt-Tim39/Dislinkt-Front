import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-experience',
  templateUrl: './user-experience.component.html',
  styleUrls: ['./user-experience.component.scss']
})
export class UserExperienceComponent implements OnInit {
  routeState: any;
  selectedUser:any;
  experience:any=[]
  constructor( private router: Router) { 
    this.routeState = this.router.getCurrentNavigation()?.extras.state;
    this.selectedUser = this.routeState;
  }
  ngOnInit(): void {
    this.getExperience()
  }
  getExperience(){
    this.experience=this.selectedUser.workExperiences;
  }

}
