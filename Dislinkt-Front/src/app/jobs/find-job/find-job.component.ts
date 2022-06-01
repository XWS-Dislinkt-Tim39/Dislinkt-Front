import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/core/services/job.service';

@Component({
  selector: 'app-find-job',
  templateUrl: './find-job.component.html',
  styleUrls: ['./find-job.component.scss']
})
export class FindJobComponent implements OnInit {
jobs: any[] = [];
  constructor(private jobService:JobService) { }

  ngOnInit(): void {
    this.findAll();
  }

  findAll(){this.jobService.getAll().subscribe(data => {
    this.jobs=data;
  }, 
  error => {
    console.log(error.error);
    alert('Error! Try again');
  });
}

}
