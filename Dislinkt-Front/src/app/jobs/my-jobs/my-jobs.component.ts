import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JobService } from 'src/app/core/services/job.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { AddJobComponent } from '../add-job/add-job.component';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.scss']
})
export class MyJobsComponent implements OnInit {
  dilogRef: any;
  userId: string = "";
  jobs: any[] = [];
  constructor(public dialog: MatDialog, private jobService: JobService, private jwtService: JwtService) { }

  ngOnInit(): void {
    this.userId = this.jwtService.getUserId();
    this.findAllByUser();
  }
  openAddDialog(event: { stopPropagation: () => void; }) {
    this.dilogRef = this.dialog.open(AddJobComponent, {
      data: {
      }
    });
  }
  findAllByUser(){this.jobService.getAllByUser(this.userId).subscribe(data => {
    this.jobs=data;
  }, 
  error => {
    console.log(error.error);
    alert('Error! Try again');
  });
}

}
