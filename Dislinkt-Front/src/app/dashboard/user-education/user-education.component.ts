import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-education',
  templateUrl: './user-education.component.html',
  styleUrls: ['./user-education.component.scss']
})
export class UserEducationComponent implements OnInit {
  routeState: any;
  selectedUser:any;
  educations:any[]=[];
  constructor( private router: Router) { 
    this.routeState = this.router.getCurrentNavigation()?.extras.state;
    this.selectedUser = this.routeState;
  }

  ngOnInit(): void {
    this.getEducation()
  }
  getEducation(){
    this.educations=this.selectedUser.educations;
  }

}
