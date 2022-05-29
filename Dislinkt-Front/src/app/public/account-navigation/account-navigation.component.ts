import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-navigation',
  templateUrl: './account-navigation.component.html',
  styleUrls: ['./account-navigation.component.scss']
})
export class AccountNavigationComponent implements OnInit {
  @Input() selectedProfile: any;  
  constructor() { }

  ngOnInit(): void {
  }

}
