import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-user-skills',
  templateUrl: './user-skills.component.html',
  styleUrls: ['./user-skills.component.scss']
})
export class UserSkillsComponent implements OnInit {
  routeState: any;
  selectedUser:any
  skills:any[]=[];
  constructor( 
    private router: Router,
    private profileService:ProfileService
    ) { 
    this.routeState = this.router.getCurrentNavigation()?.extras.state;
    this.selectedUser = this.routeState;
  }
  ngOnInit(): void {
    this.getSkills();
  }

  getSkills(){
    this.profileService.getUserSkills(this.selectedUser.id).subscribe(data=>{
      this.skills=data;
    },error=>{
      alert('Error! Try again!')
    }
    )
  }

}
