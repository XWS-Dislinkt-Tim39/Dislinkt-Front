import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-navigation',
  templateUrl: './account-navigation.component.html',
  styleUrls: ['./account-navigation.component.scss']
})
export class AccountNavigationComponent implements OnInit {
  @Input() selectedProfile: any;  
  constructor(private router: Router,) { }

  ngOnInit(): void {
  }
  goToPosts(){
    this.router.navigate(['/profile-posts'], {
      state: this.selectedProfile,
    });
  }
  goToAbout(){
    this.router.navigate(['/profile-details'], {
      state: this.selectedProfile,
    });
  }
  goToEducation(){
    this.router.navigate(['/profile-education'], {
      state: this.selectedProfile,
    });
  }
  goToExperience(){
    this.router.navigate(['/profile-experience'], {
      state: this.selectedProfile,
    });
  }
  goToSkills(){
    this.router.navigate(['/profile-skills'], {
      state: this.selectedProfile,
    });
  }

}
