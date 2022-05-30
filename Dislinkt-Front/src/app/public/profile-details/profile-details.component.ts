import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewInterest } from 'src/app/core/models/new-interest.model';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss']
})
export class ProfileDetailsComponent implements OnInit {
  routeState: any;
  interests: NewInterest[] = [];
  selectedProfile:any
  constructor(
    private profileService: ProfileService,
    private router: Router,
  ) { 
    this.routeState = this.router.getCurrentNavigation()?.extras.state;
    this.selectedProfile = this.routeState;
  }

  ngOnInit(): void {
    this.getAllInterests()
  }
  getAllInterests() {
    this.profileService.getAllInterests().subscribe(data => {
      this.interests = data;
    },
      error => {
        alert('Error!')
      })
  }

}
