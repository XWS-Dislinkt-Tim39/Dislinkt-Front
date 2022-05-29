import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  routeState: any;
  selectedProfile:any
  constructor(
    private router: Router,
  ) { 
    this.routeState = this.router.getCurrentNavigation()?.extras.state;
    this.selectedProfile = this.routeState;
  }

  ngOnInit(): void {
  }

}
