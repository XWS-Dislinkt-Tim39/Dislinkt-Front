import { AuthenticationService } from './../../core/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  hidePassword = true;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
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
    const newUser: User = { username: '', firstName: '', lastName: '', email: '', phoneNumber: '', gender: '' };
    newUser.username = this.registerForm.value.username;
    newUser.firstName = this.registerForm.value.firstName;
    newUser.lastName = this.registerForm.value.lastName;
    newUser.email = this.registerForm.value.email;
    newUser.phoneNumber = this.registerForm.value.phoneNumber;
    newUser.gender = this.registerForm.value.gender;
    this.authenticationService.register(newUser).subscribe((res: any) => {
      console.log(res);
      // this.router.navigate(['/registration-success']);
    },
      error => {
        console.log(error.error);
        alert(error.error.message);
      });
  }

}
