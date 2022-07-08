import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.scss']
})
export class AdminReportComponent implements OnInit {
  posts: any=0;
  jobs: any=0;
  connections: any=0;
  yearView: boolean = true;
  monthView: boolean = false;
  weekView: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
