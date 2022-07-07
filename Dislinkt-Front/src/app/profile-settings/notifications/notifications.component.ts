import { Component, OnInit } from '@angular/core';
import { NewNotificationSettingsData } from 'src/app/core/models/new-notification-settings-data';
import { JwtService } from 'src/app/core/services/jwt.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  connectionRequest: boolean=true;
  acceptedRejected: boolean=true;
  posts: boolean=true;
  jobs: boolean=true;
  profilePosts: boolean=true;
  messages: boolean=true;
  settings: NewNotificationSettingsData = {
    userId: '',
    messageOn: true,
    postOn: true,
    jobOn: true,
    friendRequestOn: true
  }
  userId:any;
  constructor(private profileService: ProfileService,
    private jwtService: JwtService) { }

  ngOnInit(): void {
    this.userId=this.jwtService.getUserId();
    /*this.profileService.getAboutInfo(this.userId).subscribe((data: any) => {
      if(data.status==0){
        this.profilePrivacy=false;
      } else {
        this.profilePrivacy=true;
      }
    },
      error => {
        console.log(error.error.message);
      });*/
  }

  confirm() {
    this.settings.messageOn = this.acceptedRejected;
    this.settings.postOn = this.posts;
    this.settings.jobOn = this.jobs;
    this.settings.friendRequestOn = this.connectionRequest;
    this.profileService.updateNotificationSettings(this.settings).subscribe((data: any) => {
      alert("Sucessfully saved changes!");
    },
      error => {
        console.log(error.error.message);
      });
  }

}
