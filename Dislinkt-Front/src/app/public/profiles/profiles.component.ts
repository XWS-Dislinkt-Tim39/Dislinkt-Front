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
  seniority = new FormControl();
  industry = new FormControl();
  age = new FormControl();
  seniorityList: string[] = ['Junior', 'Medior', 'Senior'];
  ageList: string[] = ['<18', '18-25', '25-35', '>35']
  noExperienceList: any[] = []

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

  getAllProfiles() {
    this.publicProfilesService.getAllPublicUsers().subscribe((data: any) => {
      this.profiles = data;
      this.profiles.forEach(element => {
        if (element.seniority == 0) {
          element.seniority = "Junior"
        } else if (element.seniority == 1) {
          element.seniority = "Medior"
        } else {
          element.seniority = "Senior"
        }
        var date = new Date(element.dateOfBirth)
        var timeDiff = Math.abs(Date.now() - Number(date));
        element.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
      });
      console.log(this.profiles)
    },
      error => {
        console.log(error.error.message);
      });
  }

  filter() {
    let filterList: any[] = [];
    this.profiles.forEach(element => {
      if (element.seniority == this.seniority.value) {
        alert("seniority")
        if (this.age.value == "<18") {
          if (element.age < 18)
            filterList.push(element)
        }else if(this.age.value=="18-25"){
          if(element.age<=25 && element.age>=18)
            filterList.push(element);
        }else if(this.age.value=="25-35"){
          if(element.age<=35 && element.age>=25)
            filterList.push(element)
        }
        else if(this.age.value==">35"){
          if(element.age>35)
            filterList.push(element)
        }
      }
      this.profiles=filterList;
      console.log(filterList)
    });

  }

  sarchUserByUsername() {
    let username = this.searchForm.value.inputUser;
    this.publicProfilesService.searchUser(username).subscribe((data: any) => {
      this.profiles = data;
    },
      error => {
        console.log(error.error.message);
      });
  }

  viewProfile(profile: any) {
    this.router.navigate(['/profile-posts'], {
      state: profile,
    });
  }

}
