import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/core/services/jwt.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
userId:any;
hidden=false;
firstName:string='';
lastName:string='';
gender:any;
  constructor(
    private profileService:ProfileService,
    private jwtService:JwtService
  ) { 
    this.userId = this.jwtService.getUserId();
  }

  ngOnInit(): void {
    this.getInfo();
  }
  getInfo() {
    this.profileService.getAboutInfo(this.userId).subscribe(data => {
      this.firstName=data.firstName;
      this.lastName=data.lastName;
      this.gender=data.gender;
    }, error => {
      console.log(error.error);
      alert('Error! Try again');
    });
  }

}
