import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-account-upadate',
  templateUrl: './account-upadate.component.html',
  styleUrls: ['./account-upadate.component.scss']
})
export class AccountUpadateComponent implements OnInit {
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,) {
    this.loginForm = this.formBuilder.group({
      username: [''],
      password: ['']
    });
  }

  ngOnInit(): void {
  }

}
