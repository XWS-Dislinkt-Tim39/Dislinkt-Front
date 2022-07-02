import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NewUserNode } from 'src/app/core/models/new-user-node.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';
import { ConnectionService } from 'src/app/core/services/connection.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-registration-confirm',
  templateUrl: './registration-confirm.component.html',
  styleUrls: ['./registration-confirm.component.scss']
})
export class RegistrationConfirmComponent implements OnInit {
  id: string = '';
  sub: any;
  user:any;
  newNode:NewUserNode={
    id:'',
    userName:'',
    status:1
  }
  constructor(
    private authService: AuthenticationService,
    private router:Router,
    private route: ActivatedRoute,
    private connectionService:ConnectionService,
    private profileService:ProfileService
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }
  approveAccount() {
    this.authService.approve(this.id).subscribe(data => {
      this.getUserData();

      this.router.navigate(['/sign-in']);  

    }, error => {
      alert('Error! Try again!')
    })
  }

  getUserData(){
    this.profileService.getAboutInfo(this.id).subscribe(data=>{
      this.user=data;
      //this.createNode();
    })
  }

  createNode(){
    this.newNode.id=this.id;
    this.newNode.userName=this.user.username;
    this.newNode.status=this.user.status;
    this.connectionService.registerUser(this.newNode).subscribe(data=>{
      alert('Succesfully');
    },error=>{
      alert('Error!Try again!');
    })
  }

}
