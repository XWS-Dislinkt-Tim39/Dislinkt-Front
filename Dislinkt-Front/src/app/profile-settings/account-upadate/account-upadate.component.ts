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
  dateOfBirth:Date=new Date();
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
    biography: "biografija",
    gender:""
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
    biography: "",
    gender:""
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
    let userDetails=JSON.parse(localStorage.getItem('userDetails') || '');
      console.log(userDetails)
    this.profileForm.get('firstName')?.setValue(userDetails.user.firstName);
    this.profileForm.get('lastName')?.setValue(userDetails.user.lastName);
    this.profileForm.get('email')?.setValue(userDetails.user.emailAddress);
    this.profileForm.get('address')?.setValue(userDetails.user.address);
    this.profileForm.get('city')?.setValue(userDetails.user.city);
    this.profileForm.get('country')?.setValue(userDetails.user.country);
    this.profileForm.get('phoneNumber')?.setValue(userDetails.user.phoneNumber);
    this.profileForm.get('dateOfBirth')?.setValue(userDetails.user.dateOfBirth);
    this.profileForm.get('biography')?.setValue(userDetails.user.biography);
    this.date1=new FormControl(userDetails.user.dateOfBirth);
    this.profileForm.disable()
  }

  editProfile(){
    this.profileForm.enable();
    this.isEdit=true;

  }
  public onDate(event: any): void {
    this.date1 = event;
    alert(this.date1.value)
  }
  saveProfile(){
    let userDetails=JSON.parse(localStorage.getItem('userDetails') || '');
    this.profileForm.disable();
    this.isEdit=false;
    this.editedProfile.id =userDetails.user.id;
    this.editedProfile.firstName = this.profileForm.value.firstName;
    this.editedProfile.lastName = this.profileForm.value.lastName;
    this.editedProfile.address = this.profileForm.value.address;
    this.editedProfile.city = this.profileForm.value.city;
    this.editedProfile.country = this.profileForm.value.country;
    this.editedProfile.emailAddress = this.profileForm.value.email;
    this.editedProfile.phoneNumber = this.profileForm.value.phoneNumber;
    this.editedProfile.biography = this.profileForm.value.biography;
    this.editedProfile.gender =userDetails.user.gender;
    this.editedProfile.dateOfBirth =this.dateOfBirth;
   this.profileService.editAboutInfo(this.editedProfile).subscribe(
      (data: any) => {
          this.oldUserInfo = data;
          alert('Successfully edited about info')
      },
      (error) => {
          console.log(error.error.message);
      });
  }

}
