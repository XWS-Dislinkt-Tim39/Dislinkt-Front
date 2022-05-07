import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-profiles',
  templateUrl: './search-profiles.component.html',
  styleUrls: ['./search-profiles.component.scss']
})
export class SearchProfilesComponent implements OnInit {
  experience = new FormControl();
  industry = new FormControl();
  age = new FormControl();
  experienceList: string[] = ['No experience', 'One year', 'Two year', 'More than 2 years'];
  industryList: string[] = ['IT', 'Doctor', 'Economist', 'Architect', 'Menager', 'Lawyer'];
  ageList: string[] = ['<18', '18-25', '25-35', '>35']
  noExperienceList: any[] = []
  constructor() { }

  ngOnInit(): void {
  }

}
