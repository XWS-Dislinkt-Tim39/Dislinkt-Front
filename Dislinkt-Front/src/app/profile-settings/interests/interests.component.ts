import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NewInterest } from 'src/app/core/models/new-interest.model';
import { NewSkill } from 'src/app/core/models/new-skill.model';
import { JwtService } from 'src/app/core/services/jwt.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.scss']
})
export class InterestsComponent implements OnInit {
  isIconPress: boolean = false;
  distinctInterests: NewSkill[] = [];
  userInterests: any[] = [];
  addForm: FormGroup;
  addInterestForm: FormGroup;
  @ViewChild('addSkillCategory') addDialog!: any;
  @ViewChild('addSkill') addSkillDialog!: any;
  userId: any;
  interests: NewInterest[] = [];
  newInterest: NewInterest = {
    name: '',
    userId: ''
  }
  selected: any;

  constructor(private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private profileService: ProfileService,
    private jwtService: JwtService
  ) {
    this.userId = this.jwtService.getUserId();
    this.addForm = this.formBuilder.group({
      category: [''],
    });
    this.addInterestForm = this.formBuilder.group({
      interest: [''],
    });
  }

  ngOnInit(): void {
    this.getAllInterests();
    this.getSkills();
  }

  getAllInterests() {
    this.profileService.getAllInterests().subscribe(data => {
      this.interests = data;
      this.distinctInterests = this.interests.filter(
        (thing, i, arr) => arr.findIndex(t => t.name === thing.name) === i
      );
    },
      error => {
        alert('Error!')
      })
  }

  getSkills() {
    this.profileService.getUserInterests(this.userId).subscribe(data => {
      this.userInterests = data;
    }, error => {
      alert('Error! Try again!')
    }
    )
  }

  addNewInterest() {
    this.newInterest.userId = this.userId;
    if (this.addInterestForm.value.interest == "") {
      this.newInterest.name = this.selected.name;

    } else {
      this.newInterest.name = this.addInterestForm.value.interest;
    }
    this.profileService.addNewInterest(this.newInterest).subscribe(data => {
      alert('Successfully added new interest');
      window.location.reload();
    }, error => {
      alert('Error! Try again!')
    })
  }

  removeInterest(interestId:string){
    this.profileService.removeInterest(this.userId,interestId).subscribe(data=>{
      window.location.reload();
    },error=>{
      alert('Error!Try again!')
    })
  }



  opetAddInterestDialog(event: any) {
    event?.stopPropagation();
    const myTempDialog = this.dialog.open(this.addSkillDialog);
    myTempDialog.afterClosed().subscribe((res) => {
      console.log({ res });
    });
    this.isIconPress = false;
  }

}
