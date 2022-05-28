import { JwtService } from './../../core/services/jwt.service';
import { AuthenticationService } from './../../core/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorMatcher } from 'src/app/core/error/error-matcher';
import { UserSignIn } from 'src/app/core/models/user-sign-in.model';
import { UserToken } from 'src/app/core/models/user-token.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  hidePassword = true;
  token:string='';
  matcher: ErrorMatcher = new ErrorMatcher();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private jwtService: JwtService
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }
  get login(): { [key: string]: AbstractControl; } { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    const login: UserSignIn = { emailAddress: '', password: '' };
    login.emailAddress = this.loginForm.value.username;
    login.password = this.loginForm.value.password;
    this.authenticationService.signUp(login).subscribe((data: any) => {
      this.jwtService.saveUserDetails(data);
      this.router.navigate(['/dashboard']);  
    },
      error => {
        alert(error.error.message);
      });


  }

}
