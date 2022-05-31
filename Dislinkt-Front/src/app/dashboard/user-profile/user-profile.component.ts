import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
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
