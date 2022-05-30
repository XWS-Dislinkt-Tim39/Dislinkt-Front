import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss']
})
export class ProfilePostsComponent implements OnInit {
  routeState: any;
  selectedProfile:any
  constructor( private router: Router) { 
    this.routeState = this.router.getCurrentNavigation()?.extras.state;
    this.selectedProfile = this.routeState;
  }

  ngOnInit(): void {
  }

}
