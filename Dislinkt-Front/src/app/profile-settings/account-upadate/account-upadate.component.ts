import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UpdateUser } from 'src/app/core/models/updateUser.model';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-account-upadate',
  templateUrl: './account-upadate.component.html',
  styleUrls: ['./account-upadate.component.scss']
})
export class AccountUpadateComponent implements OnInit {
  profileForm: FormGroup;
  date1=new FormControl(new Date());
  oldUserInfo:UpdateUser={
    id:"",
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
  editedProfile:UpdateUser={
    id:"",
    firstName: "",
    lastName: "",
    emailAddress: "",
    address: "",
    city: "",
    country: "",
    phoneNumber: "",
    dateOfBirth: new Date(),
    biography: ""
  }
  isEdit:boolean=false;
  constructor(
    private formBuilder: FormBuilder,
    private profileService:ProfileService
    ) 
    {
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
   /* this.profileService.getAboutInfo("id").subscribe(
      (data: any) => {
          this.oldUserInfo = data;
      },
      (error) => {
          console.log(error.error.message);
      }
  );*/
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
    this.editedProfile.id = "id";
    this.editedProfile.firstName = this.profileForm.value.firstName;
    this.editedProfile.lastName = this.profileForm.value.lastName;
    this.editedProfile.address = this.profileForm.value.address;
    this.editedProfile.city = this.profileForm.value.city;
    this.editedProfile.country = this.profileForm.value.country;
    this.editedProfile.emailAddress = this.profileForm.value.email;
    this.editedProfile.phoneNumber = this.profileForm.value.phoneNumber;
    this.editedProfile.biography = this.profileForm.value.biography;
   /* this.profileService.editAboutInfo(this.editedProfile).subscribe(
      (data: any) => {
          this.oldUserInfo = data;
      },
      (error) => {
          console.log(error.error.message);
      });*/
  }

}
