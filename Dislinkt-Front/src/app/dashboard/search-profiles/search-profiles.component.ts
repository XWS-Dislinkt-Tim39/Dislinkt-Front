import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Connection } from 'src/app/core/models/connection.model';
import { ConnectionService } from 'src/app/core/services/connection.service';
import { JwtService } from 'src/app/core/services/jwt.service';
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
  noExperienceList: any[] = [];
  userId:any;
  constructor(
    private publicProfilesService:PublicProfilesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private connectionService:ConnectionService,
    private jwtService:JwtService
  ) {
    this.searchForm = this.formBuilder.group({
      inputUser: [''],
    });
   }

  ngOnInit(): void {
    this.userId=this.jwtService.getUserId();
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

  follow(profileId:string){
    alert(profileId);
    let connection:Connection={
      sourceId:this.userId,
      targetId:profileId,
      connectionName:''
    }
    this.connectionService.followPublicUser(connection).subscribe(data=>{
      alert('Successfully connected!')
    },error=>{
      alert('Error!Try again!')
    })

  }

}
