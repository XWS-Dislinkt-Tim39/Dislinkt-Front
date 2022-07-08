import { Component, OnInit } from '@angular/core';

import { interval } from 'rxjs';
import { JwtService } from 'src/app/core/services/jwt.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { PublicProfilesService } from 'src/app/core/services/public-profiles.service';

import { NewNotificationSettingsData } from 'src/app/core/models/new-notification-settings-data';
import { NotificationSeen } from 'src/app/core/models/notification-seen.model';
import { Router } from '@angular/router';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  posts: boolean = true;
  jobs: boolean = true;
  settings: NewNotificationSettingsData = {
    userId: '',
    messageOn: true,
    postOn: true,
    jobOn: true,
    friendRequestOn: true
  }
  messages: boolean = true;
  requests:boolean=true;
  profiles: any[] = [];
  notifications: any[] = [];
  notificationCount: any = 0;
  notificationSeen:NotificationSeen={
    userId:'',
    notificationId:'',
    seen:false
  }
  userId: any;
  constructor(
    private publicProfilesService: PublicProfilesService,
    private profileService: ProfileService,
    private jwtService: JwtService,
    private notificationService: NotificationService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.userId = this.jwtService.getUserId();
    this.getAllProfiles();
    this.getInitialSettings();
    interval(1000).subscribe(x => {
      this.getAllNotifications();
    });
  }

  getInitialSettings(){
    this.notificationService.getUserNotifications(this.userId).subscribe(data=>{
      this.posts=data.postOn;
      this.jobs=data.jobOn;
      this.messages=data.messageOn;
      this.requests=data.friendRequestOn;
    })
  }


  getAllNotifications() {
    this.notificationCount=0;
    this.notificationService.getUserNotifications(this.userId).subscribe(data => {
      if(data!=null){
        if (!this.areEqual(this.notifications, data.notifications)) {
          this.notifications = [];
          data.notifications.forEach((el: any) => {
            if (el.type != 0 ) {
              this.notifications.push(el);
              if(el.seen==false){
                this.notificationCount++;
              }
            }
          });
          this.formatView();
        }
      }
    }, error => {
      alert('Error!')
    })
  }

  areEqual(array1: any[], array2: any[]) {
    if (array1.length === array2.length) {
      return array1.every((element, index) => {
        if (element.from === array2[index].from) {
          return true;
        }
        return false;
      });
    }

    return false;
  }

  formatView() {
    this.notifications.reverse(); 
    localStorage.setItem('notificationCount', this.notificationCount)
    this.notifications.forEach(element => {
      this.profileService.getAboutInfo(element.from).subscribe(data => {
        element.firstName = data.firstName;
        element.lastName = data.lastName;
        element.gender = data.gender;
        if (element.type == 1) {
          element.message = ' posted new post'
        }
        else if (element.type == 2) {
          element.message = ' posted new job offer'
        }
        else if (element.type == 3) {
          element.message = ' sent you connection request'
        }
      })
    });
  }

  getAllProfiles() {
    this.publicProfilesService.getAllUsers().subscribe((data: any) => {
      this.profiles = data;
      this.profiles.forEach((value, i: any) => {
        if (this.profiles[i].id == this.userId) {
          this.profiles.splice(i, 1);
        }

      });
    },error=>{

    })
  }

  confirm() {
    this.settings.userId=this.userId;
    this.settings.messageOn = this.messages;
    this.settings.postOn = this.posts;
    this.settings.jobOn = this.jobs;
    this.settings.friendRequestOn = this.requests;
    console.log(this.settings)
    this.profileService.updateNotificationSettings(this.settings).subscribe((data: any) => {
      alert("Sucessfully saved changes!");

    },
      error => {
        console.log(error.error.message);
      });
  }

  seenNotifications(){
    if(this.notifications.length!=0){
      this.notifications.forEach(element => {
        this.notificationSeen.userId=this.userId;
        this.notificationSeen.notificationId=element.id;
        this.notificationSeen.seen=true;
        this.notificationService.updateNotificationSeen(this.notificationSeen).subscribe(data=>{
          window.location.reload();
        },error=>{
          alert('Error')
        })
      });
    }
  }

  viewNotification(row:any){
    this.notificationSeen.userId=this.userId;
    this.notificationSeen.notificationId=row.id;
    this.notificationSeen.seen=true;
    this.notificationService.updateNotificationSeen(this.notificationSeen).subscribe(data=>{
      if(row.type==2){
        this.router.navigate(['/find-job'])
      }else{
        this.router.navigate(['/dashboard'])
      }
    },error=>{
      alert('Error')
    }) 
  }


}
