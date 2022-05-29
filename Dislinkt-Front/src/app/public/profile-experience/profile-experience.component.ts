import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-experience',
  templateUrl: './profile-experience.component.html',
  styleUrls: ['./profile-experience.component.scss']
})
export class ProfileExperienceComponent implements OnInit {
  @Input() selectedProfile: any;  
  constructor() { }

  ngOnInit(): void {
  }

}
