import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { PublicProfilesService } from 'src/app/core/services/public-profiles.service';

@Component({
  selector: 'app-search-profiles',
  templateUrl: './search-profiles.component.html',
  styleUrls: ['./search-profiles.component.scss']
})
export class SearchProfilesComponent implements OnInit {
  experience = new FormControl();
  industry = new FormControl();
  age = new FormControl();
  profiles: any[] = [];
  resultProfile: any;
  searchForm: FormGroup;
  experienceList: string[] = ['No experience', 'One year', 'Two year', 'More than 2 years'];
  industryList: string[] = ['IT', 'Doctor', 'Economist', 'Architect', 'Menager', 'Lawyer'];
  ageList: string[] = ['<18', '18-25', '25-35', '>35']
  noExperienceList: any[] = []
  constructor(
    private publicProfilesService:PublicProfilesService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.searchForm = this.formBuilder.group({
      inputUser: [''],
    });
   }

  ngOnInit(): void {
    this.getAllProfiles();
  }
  getAllProfiles() {
    this.publicProfilesService.getAllUsers().subscribe((data: any) => {
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
    if(username==''){
      this.getAllProfiles();
    }
    else{
      this.publicProfilesService.searchUser(username).subscribe((data: any) => {
        this.profiles = data;
  
      },
        error => {
          console.log(error.error.message);
        });
    }
  }

  viewProfile(profile:any){
    this.router.navigate(['/user-profile'], {
      state: profile,
    });
  }

}
