import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NewSkill } from 'src/app/core/models/new-skill.model';
import { JobService } from 'src/app/core/services/job.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-app-skills',
  templateUrl: './app-skills.component.html',
  styleUrls: ['./app-skills.component.scss']
})
export class AppSkillsComponent implements OnInit {
  allSkills: any[] = [];
  addSkillForm: FormGroup;
  skillName: string = "";
  newSkill: NewSkill = {
    'name': '',
    'userId': ''
  }
  userId:any;
  constructor(
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    private jobService:JobService,
    private jwtService:JwtService
    ) {
      this.userId = this.jwtService.getUserId();
      this.addSkillForm = this.formBuilder.group({
        skill: [''],
      });
  }

  ngOnInit(): void {
    this.getAllSkills();
  }

  getAllSkills(){
    this.profileService.getAllSkills().subscribe(data=>{
      this.allSkills=data;
    },error=>{
      alert('Error!')
    })
  }

  addNewSkill() {
    this.newSkill.name = this.addSkillForm.value.skill;
    this.newSkill.userId=this.userId;
    console.log(this.newSkill.name)
    this.profileService.addNewSkill(this.newSkill).subscribe(data => {
      console.log();
      this.jobService.addAppSkill({
        'id':data.id,
        'name':data.name
      }).subscribe(data=>{
        alert('ss')
      })
      alert('Successfully added new skill');
      this.allSkills.push(data)
    }, error => {
      alert('Error! Try again!')
    })
  }

}
