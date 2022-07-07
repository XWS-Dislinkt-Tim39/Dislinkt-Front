import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/core/services/jwt.service';
import { NotificationService } from 'src/app/core/services/notification.service';
import { ProfileService } from 'src/app/core/services/profile.service';
import { PublicProfilesService } from 'src/app/core/services/public-profiles.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  connectionRequest: boolean = true;
  acceptedRejected: boolean = true;
  jobPosts: boolean = true;
  profilePosts: boolean = true;
  messages: boolean = true;
  profiles: any[] = [];
  allNotifications: any[] = [];
  notifications:any[]=[];
  notificationCount:any=0;
  userId: any;
  constructor(
    private publicProfilesService: PublicProfilesService,
    private profileService: ProfileService,
    private jwtService: JwtService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.userId = this.jwtService.getUserId();
    this.getAllProfiles();
    this.getAllNotifications();
  }
  confirm() { }


  getAllNotifications() {
    this.notificationService.getUserNotifications(this.userId).subscribe(data => {
     data.notifications.forEach((el:any) => {
        if(el.type!=0 && el.seen==false){
          this.notifications.push(el);
        }
     });
      this.formatView();
    }, error => {
      alert('Error!')
    })
  }

  formatView() {
    this.notificationCount=this.notifications.length;
    localStorage.setItem('notificationCount',this.notificationCount)
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
    },
      error => {
        console.log(error.error.message);
      });
  }

}
