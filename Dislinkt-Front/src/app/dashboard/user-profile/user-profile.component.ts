import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionService } from 'src/app/core/services/connection.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  routeState: any;
  selectedUser:any;
  interests:any[]=[];
  myConnections:any[]=[];
  userId:any;
  constructor(
    private profileService: ProfileService,
    private router: Router,
    private connectionService:ConnectionService,
    private jwtService:JwtService
  ) { 
    this.routeState = this.router.getCurrentNavigation()?.extras.state;
    this.selectedUser = this.routeState;
   
  }

  ngOnInit(): void {
    this.userId=this.jwtService.getUserId();
    this.getAllInterests();
    this.getMyConnections();
  }
  getAllInterests() {
    this.profileService.getUserInterests(this.selectedUser.id).subscribe(data => {
      this.interests = data;
    },
      error => {
        alert('Error!')
      })
  }
  checkIfConnect(){
    if (this.myConnections.indexOf(this.selectedUser.id) !== -1) {
      this.selectedUser.status=1;
    }
  }

  getMyConnections(){
    this.connectionService.getConnections(this.userId).subscribe(data=>{
      this.myConnections=data;
      this.checkIfConnect();
    },
    error=>{
      alert('Error!');
    })
  }

}
