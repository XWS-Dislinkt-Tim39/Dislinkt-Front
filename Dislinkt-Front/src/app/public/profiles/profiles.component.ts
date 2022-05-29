import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicProfilesService } from 'src/app/core/services/public-profiles.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss']
})
export class ProfilesComponent implements OnInit {
  profiles: any[] = [];
  resultProfile: any;
  searchForm: FormGroup;
  constructor( 
    private formBuilder: FormBuilder,
    private router: Router,
    private publicProfilesService: PublicProfilesService) {
    this.searchForm = this.formBuilder.group({
      inputUser: [''],
    });
   }

  ngOnInit(): void {
    this.getAllProfiles();
  }
  get searchF(): { [key: string]: AbstractControl } {
    return this.searchForm.controls;
  }
  experience = new FormControl();
  industry = new FormControl();
  age = new FormControl();
  experienceList: string[] = ['No experience', 'One year', 'Two year', 'More than 2 years'];
  industryList: string[] = ['IT', 'Doctor', 'Economist', 'Architect', 'Menager', 'Lawyer'];
  ageList: string[] = ['<18', '18-25', '25-35', '>35']
  noExperienceList: any[] = []


  getAllProfiles() {
    this.publicProfilesService.getAllPublicUsers().subscribe((data: any) => {
      this.profiles = data;
    },
      error => {
        console.log(error.error.message);
      });
  }


  showExperienceFilter() {
    this.profiles.forEach(profile => {

    });
  }

  sarchUserByUsername() {
    let username=this.searchForm.value.inputUser;
    this.publicProfilesService.searchUser(username).subscribe((data: any) => {
      this.profiles = data;

    },
      error => {
        console.log(error.error.message);
      });
  }

  viewProfile(profile:any){
    this.router.navigate(['/profile-details'], {
      state: profile,
    });
  }

}
