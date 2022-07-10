import { AuthenticationService } from './../../core/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';
import { ConnectionService } from 'src/app/core/services/connection.service';
import { NewUserNode } from 'src/app/core/models/new-user-node.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  seniority:any=0;
  submitted = false;
  seniorityList:any[]=['Junior','Medior','Senior']
  hidePassword = true;
  newNode:NewUserNode={
    id:'',
    userName:'',
    status:1
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private connectionService:ConnectionService
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      date: [''],
      gender: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }
  get register(): { [key: string]: AbstractControl; } { return this.registerForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    if (!this.checkPassword()) {
      alert('Password and confirm password are not the same! Please try again!');
      return;
    }
    const newUser: User = { username: '', firstName: '', lastName: '', emailAddress: '', password: '', address: '', city: '', country: '', phoneNumber: '', dateOfBirth: new Date(), gender: '',seniority:'' };
    newUser.username = this.registerForm.value.username;
    newUser.firstName = this.registerForm.value.firstName;
    newUser.lastName = this.registerForm.value.lastName;
    newUser.password = this.registerForm.value.password;
    newUser.emailAddress = this.registerForm.value.email;
    newUser.address = this.registerForm.value.address;
    newUser.city = this.registerForm.value.city;
    newUser.country = this.registerForm.value.country;
    newUser.dateOfBirth = this.registerForm.value.date;
    newUser.phoneNumber = this.registerForm.value.phoneNumber;
    newUser.gender = this.registerForm.value.gender;
    newUser.seniority=this.seniority;
    console.log(newUser)
  
    this.authenticationService.register(newUser).subscribe((res: any) => {
      console.log(res);
      alert('Sucessfully registered! ')
     this.router.navigate(['/sign-in']);
    },
      error => {
        console.log(error.error);
        alert('Error! Try again!');
      });
  }

  

  checkPassword(): boolean {
    if (this.registerForm.value.password === this.registerForm.value.confirmPassword)
      return true;
    return false;
  }

}
