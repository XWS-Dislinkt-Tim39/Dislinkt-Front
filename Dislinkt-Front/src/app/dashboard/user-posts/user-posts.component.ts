import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {
  routeState: any;
  selectedUser:any
  
  constructor(
    private profileService: ProfileService,
    private router: Router,
  ) { 
    this.routeState = this.router.getCurrentNavigation()?.extras.state;
    this.selectedUser = this.routeState;
  }

  ngOnInit(): void {
  }

}
