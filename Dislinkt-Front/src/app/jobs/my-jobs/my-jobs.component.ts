import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddJobComponent } from '../add-job/add-job.component';

@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.scss']
})
export class MyJobsComponent implements OnInit {
  dilogRef: any
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openAddDialog(event: { stopPropagation: () => void; }) {
    this.dilogRef = this.dialog.open(AddJobComponent, {
      data: {
      }
    });
  }

}
