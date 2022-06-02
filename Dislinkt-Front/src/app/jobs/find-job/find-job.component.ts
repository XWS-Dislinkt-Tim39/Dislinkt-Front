import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { JobService } from 'src/app/core/services/job.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-find-job',
  templateUrl: './find-job.component.html',
  styleUrls: ['./find-job.component.scss']
})
export class FindJobComponent implements OnInit {
  jobs: any[] = [];
  searchForm: FormGroup;
  constructor(private jobService: JobService,
    private formBuilder: FormBuilder,
    private profileService: ProfileService) {
    this.searchForm = this.formBuilder.group({
      inputUser: [''],
    });
  }

  ngOnInit(): void {
    this.findAll();
  }

  get searchF(): { [key: string]: AbstractControl } {
    return this.searchForm.controls;
  }

  findAll() {
    this.jobService.getAll().subscribe(data => {
      this.jobs = data;
      this.jobs.forEach((value,i: any)=>{
        this.profileService.getAboutInfo(value.publisherId).subscribe(data => {
          value.userFirstName = data.firstName;
          value.userLastName = data.lastName;
          value.city = data.city;
          value.country = data.country;
          value.gender = data.gender;
        })
      
    });
    },
      error => {
        console.log(error.error);
        alert('Error! Try again');
      });
  }

  searchJob() {
    let positionName = this.searchForm.value.inputUser;
    this.jobService.searchPost(positionName).subscribe((data: any) => {
      this.jobs = data;

    },
      error => {
        console.log(error.error.message);
      });
  }
}



