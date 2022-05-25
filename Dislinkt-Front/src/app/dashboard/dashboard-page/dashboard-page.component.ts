import { AddPostComponent } from './../add-post/add-post.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  dilogRef: any
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  openAddDialog(event: { stopPropagation: () => void; }) {
    this.dilogRef = this.dialog.open(AddPostComponent, {
      data: {
      }
    });
  }

}
