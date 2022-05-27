import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UpdateUser } from 'src/app/core/models/updateUser.model';

@Component({
  selector: 'app-account-upadate',
  templateUrl: './account-upadate.component.html',
  styleUrls: ['./account-upadate.component.scss']
})
export class AccountUpadateComponent implements OnInit {
  profileForm: FormGroup;
  date1=new FormControl(new Date());
  oldUserInfo:UpdateUser={
    firstName: "Sara",
    lastName: "Savkovic",
    emailAddress: "sara@gmail.com",
    address: "Vidovdanska 56",
    city: "Gradiska",
    country: "Bosna i Hercegovina",
    phoneNumber: "0654125478",
    dateOfBirth: new Date(),
    biography: "biografija"
  }
  isEdit:boolean=false;
  constructor(private formBuilder: FormBuilder,) {
    this.profileForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      address: [''],
      city: [''],
      country: [''],
      email: [''],
      phoneNumber: [''],
      dateOfBirth: [''],
      biography:['']
    });
  }
  get fGeneral(): { [key: string]: AbstractControl } {
    return this.profileForm.controls;
  }
  ngOnInit(): void {
    this.loadData();
  }

  loadData(){
    this.profileForm.get('firstName')?.setValue(this.oldUserInfo.firstName);
    this.profileForm.get('lastName')?.setValue(this.oldUserInfo.lastName);
    this.profileForm.get('email')?.setValue(this.oldUserInfo.emailAddress);
    this.profileForm.get('address')?.setValue(this.oldUserInfo.address);
    this.profileForm.get('city')?.setValue(this.oldUserInfo.city);
    this.profileForm.get('country')?.setValue(this.oldUserInfo.country);
    this.profileForm.get('phoneNumber')?.setValue(this.oldUserInfo.phoneNumber);
    this.profileForm.get('dateOfBirth')?.setValue(this.oldUserInfo.dateOfBirth);
    this.profileForm.get('biography')?.setValue(this.oldUserInfo.biography);
    this.date1=new FormControl(this.oldUserInfo.dateOfBirth);
    this.profileForm.disable()
  }

  editProfile(){
    this.profileForm.enable();
    this.isEdit=true;

  }
  saveProfile(){
    this.profileForm.disable();
    this.isEdit=false;
  }

}
