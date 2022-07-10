import { Component, Input, OnInit } from '@angular/core';
import { interval } from 'rxjs';
import { JwtService } from 'src/app/core/services/jwt.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
 notificationCount:any=0;
 messageNotificationCount:any=0;
  userId: any;
  hidden = true;
  messageHidden = true;
  firstName: string = '';
  lastName: string = '';
  notifications:any[]=[];
  gender: any;
  count=0;
  messageCount=0;
  posts:any[]=[];
  jobs:any[]=[];
  requests:any[]=[];
  onValues:any[]=[]
  constructor(
    private profileService: ProfileService,
    private jwtService: JwtService,
    private notificationService:NotificationService
  ) {
    this.userId = this.jwtService.getUserId();
  }

  ngOnInit(): void {
    this.getInfo();
    interval(1000).subscribe(x => {
      this.getAllNotifications();
      this.getMessageNotification();
      
    });
  }
  getInfo() {
    this.profileService.getAboutInfo(this.userId).subscribe(data => {
      this.firstName = data.firstName;
      this.lastName = data.lastName;
      this.gender = data.gender;
    }, error => {
      console.log(error.error);
      alert('Error! Try again');
    });
  }

  getNotificationCount(){
    this.notificationCount=localStorage.getItem('notificationCount');
    if(this.notificationCount==0){
      this.hidden=true;
    }
    else{
      this.hidden=false;
    }
  }
  getOnValues() {
    if (this.posts) {
      this.onValues.push(1)
    }
    if (this.jobs) {
      this.onValues.push(2)
    }
    if (this.requests) {
      this.onValues.push(3)
    }
  }


  
  getAllNotifications() {
    this.notificationCount=0;
    this.notificationService.getAllUserNotifications(this.userId).subscribe(data => {
      this.posts=data.postOn;
      this.jobs=data.jobOn;
      this.requests=data.friendRequestOn;
      this.getOnValues();
      if(data!=null){
        if (!this.areEqual(this.notifications, data.notifications)) {
          data.notifications.forEach((el: any) => {
            if (el.type != 0 && el.seen == false) {
              if(this.onValues.indexOf(el.type) !== -1) {
                  this.notificationCount++;
                
              }
            }
          });
        }
      }
      localStorage.setItem('notificationCount', this.notificationCount);
      this.count=this.notificationCount;
      if(this.notificationCount==0){
        this.hidden=true;
      }
      else{
        this.hidden=false;
      }
    }, error => {
      alert('Error!')
    })
  }

  getMessageNotification(){
    this.messageNotificationCount=0;
    this.notificationService.getAllUserNotifications(this.userId).subscribe(data => {
      if(data!=null){
        if(data.messageOn){
          data.notifications.forEach((el: any) => {
            if (el.type == 0 && el.seen == false) {
                  this.messageNotificationCount++;
            }
          });
        }
        
      }
      localStorage.setItem('messageNotificationCount', this.messageNotificationCount);
      this.messageCount=this.messageNotificationCount;
      if(this.messageNotificationCount==0){
        this.messageHidden=true;
      }
      else{
        this.messageHidden=false;
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


}
