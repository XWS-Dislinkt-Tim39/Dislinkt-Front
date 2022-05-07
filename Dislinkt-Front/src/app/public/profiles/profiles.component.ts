import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PublicProfilesService } from 'src/app/core/services/public-profiles.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  profiles: any[] = [];
  constructor(private publicProfilesService: PublicProfilesService) { }

  ngOnInit(): void {
    this.getAllProfiles();
  }
  experience = new FormControl();
  industry = new FormControl();
  age = new FormControl();
  experienceList: string[] = ['No experience', 'One year', 'Two year', 'More than 2 years'];
  industryList: string[] = ['IT', 'Doctor', 'Economist', 'Architect', 'Menager', 'Lawyer'];
  ageList: string[] = ['<18', '18-25', '25-35', '>35']

  getAllProfiles() {
    this.publicProfilesService.getAllPublicProfiles().subscribe((data: any) => {
      this.profiles = data;
    },
      error => {
        console.log(error.error.message);
      });
  }

  sarchUserByUsername(username: string) {
    this.publicProfilesService.searchUser(username).subscribe((data: any) => {
      this.profiles = data;
    },
      error => {
        console.log(error.error.message);
      });
  }

}
