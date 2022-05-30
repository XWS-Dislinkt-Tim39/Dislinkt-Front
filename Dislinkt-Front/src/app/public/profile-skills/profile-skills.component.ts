import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-profile-skills',
  templateUrl: './profile-skills.component.html',
  styleUrls: ['./profile-skills.component.scss']
})
export class ProfileSkillsComponent implements OnInit {
  routeState: any;
  selectedProfile:any
  skills:any[]=[];
  constructor( 
    private router: Router,
    private profileService:ProfileService
    ) { 
    this.routeState = this.router.getCurrentNavigation()?.extras.state;
    this.selectedProfile = this.routeState;
  }
  ngOnInit(): void {
    this.getSkills();
  }

  getSkills(){
    alert(this.selectedProfile.id)
    this.profileService.getUserSkills(this.selectedProfile.id).subscribe(data=>{
      this.skills=data;
    },error=>{
      alert('Error! Try again!')
    }
    )
  }

}
