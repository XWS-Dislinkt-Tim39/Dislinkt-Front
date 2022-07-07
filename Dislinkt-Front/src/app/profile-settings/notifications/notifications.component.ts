import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/core/services/jwt.service';
import { PublicProfilesService } from 'src/app/core/services/public-profiles.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  connectionRequest: boolean=true;
  acceptedRejected: boolean=true;
  jobPosts: boolean=true;
  profilePosts: boolean=true;
  messages: boolean=true;
  profiles:any[]=[];
  userId:any;
  constructor(
    private publicProfilesService:PublicProfilesService,
    private jwtService:JwtService
  ) { }

  ngOnInit(): void {
    this.userId=this.jwtService.getUserId();
    this.getAllProfiles();
  }
  confirm() {}


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

}
