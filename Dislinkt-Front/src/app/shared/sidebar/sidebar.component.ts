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
  userId: any;
  hidden = true;
  firstName: string = '';
  lastName: string = '';
  notifications:any[]=[];
  gender: any;
  count=0;
  constructor(
    private profileService: ProfileService,
    private jwtService: JwtService,
    private notificationService:NotificationService
  ) {
    this.userId = this.jwtService.getUserId();
  }

  ngOnInit(): void {
    this.getInfo();
    interval(100).subscribe(x => {
      this.getAllNotifications();
      
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

  
  getAllNotifications() {
    this.notificationCount=0;
    this.notificationService.getUserNotifications(this.userId).subscribe(data => {
      if(data!=null){
        if (!this.areEqual(this.notifications, data.notifications)) {
          data.notifications.forEach((el: any) => {
            if (el.type != 0 && el.seen == false) {
              this.notificationCount++;
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
