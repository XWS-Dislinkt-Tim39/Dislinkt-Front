import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ConnectionService } from 'src/app/core/services/connection.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { PublicProfilesService } from 'src/app/core/services/public-profiles.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  connections:any[]=[];
  userId:any;
  profiles: any[] = [];
  searchForm: FormGroup;
  profilePrivacy: any;
  constructor(private publicProfilesService:PublicProfilesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private connectionService:ConnectionService,
    private jwtService:JwtService) { 
      this.searchForm = this.formBuilder.group({
        inputUser: [''],
      });
    }

  ngOnInit(): void {
    this.userId=this.jwtService.getUserId();
    this.getAllProfiles();
    this.getUserConnections();
  }
  getAllProfiles() {
    this.publicProfilesService.getAllUsers().subscribe((data: any) => {
      this.profiles = data;
      this.profiles.forEach((value,i: any)=>{
        if(this.profiles[i].id==this.userId) {
          this.profiles.splice(i,1);
        }
        
    });
    },
      error => {
        console.log(error.error.message);
      });
  }
  getUserConnections(){
    this.connectionService.getConnections(this.userId).subscribe(data=>{
      this.connections=data;
    })
  }
  isConnected(targetId:any):boolean{
    if(this.connections==null)
      return false;
    if(this.connections.indexOf(targetId) !== -1) {
      return true
    }
    return false
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
  block(profileId:string){}

}
