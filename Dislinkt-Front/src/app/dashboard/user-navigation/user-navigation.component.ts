import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-navigation',
  templateUrl: './user-navigation.component.html',
  styleUrls: ['./user-navigation.component.scss']
})
export class UserNavigationComponent implements OnInit {
  @Input() selectedUser: any;  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  goToPosts(){
    this.router.navigate(['/user-posts'], {
      state: this.selectedUser,
    });
  }
  goToAbout(){
    this.router.navigate(['/user-profile'], {
      state: this.selectedUser,
    });
  }
  goToEducation(){
    this.router.navigate(['/user-education'], {
      state: this.selectedUser,
    });
  }
  goToExperience(){
    this.router.navigate(['/user-experience'], {
      state: this.selectedUser,
    });
  }
  goToSkills(){
    this.router.navigate(['/user-skills'], {
      state: this.selectedUser,
    });
  }

}
