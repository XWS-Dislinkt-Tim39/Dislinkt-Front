import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NewSkill } from 'src/app/core/models/new-skill.model';
import { JwtService } from 'src/app/core/services/jwt.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss']
})
export class SkillsComponent implements OnInit {
  isIconPress: boolean = false;
  addForm: FormGroup;
  addSkillForm: FormGroup;
  @ViewChild('addSkillCategory') addDialog!: any;
  @ViewChild('addSkill') addSkillDialog!: any;
userId:any;
  skills: NewSkill[] = [];
  distinctSkills:NewSkill[] = [];
  userSkills: NewSkill[] = [];
  newSkill:NewSkill={
    name:'',
    userId:''
  }
  selected:any;

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private profileService: ProfileService,
    private jwtService:JwtService
  ) {
    this.userId = this.jwtService.getUserId();
    this.addForm = this.formBuilder.group({
      category: [''],
    });
    this.addSkillForm = this.formBuilder.group({
      skill: [''],
    });
  }

  ngOnInit(): void {
    this.getAllSkills();
    this.getSkills();
  }

  getAllSkills() {
    this.profileService.getAllSkills().subscribe(data => {
      this.skills = data;
      this.distinctSkills = this.skills.filter(
        (thing, i, arr) => arr.findIndex(t => t.name === thing.name) === i
      );
    },
      error => {
        alert('Error!')
      })
  }
  getSkills(){
    this.profileService.getUserSkills(this.userId).subscribe(data=>{
      this.userSkills=data;
    },error=>{
      alert('Error! Try again!')
    }
    )
  }
  addNewSkill() {
    this.newSkill.userId=this.userId;
    if(this.addSkillForm.value.skill==""){
      this.newSkill.name=this.selected.name;
     
    }else{
      this.newSkill.name=this.addSkillForm.value.skill;
    }
    this.profileService.addNewSkill(this.newSkill).subscribe(data=>{
      alert('Successfully added new skill');
      window.location.reload();
    },error=>{
      alert('Error! Try again!')
    })
   }

  opetAddCategoryDialog(event: any) {
    event?.stopPropagation();
    const myTempDialog = this.dialog.open(this.addDialog);
    myTempDialog.afterClosed().subscribe((res) => {
      console.log({ res });
    });
    this.isIconPress = false;
  }

  opetAddSkillDialog(event: any) {
    event?.stopPropagation();
    const myTempDialog = this.dialog.open(this.addSkillDialog);
    myTempDialog.afterClosed().subscribe((res) => {
      console.log({ res });
    });
    this.isIconPress = false;
  }

}
