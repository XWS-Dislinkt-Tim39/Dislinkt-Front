import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-skills',
  templateUrl: './profile-skills.component.html',
  styleUrls: ['./profile-skills.component.scss']
})
export class ProfileSkillsComponent implements OnInit {
  routeState: any;
  selectedProfile:any
  constructor( private router: Router) { 
    this.routeState = this.router.getCurrentNavigation()?.extras.state;
    this.selectedProfile = this.routeState;
  }
  ngOnInit(): void {
  }

}
