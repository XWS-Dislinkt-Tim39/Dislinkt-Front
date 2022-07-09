import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  date: string;
  user: string;
  text: string;
  type: string;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {date: "22 Jun 2022 15:32", user:"Sara Saric",text:"created post",type:"Post"},
  {date: "22 Jun 2022 15:32", user:"Nikola Nikolic",text:"created job",type:"Job"},
  {date: "22 Jun 2022 15:32", user:"Marko Markovic",text:"created post",type:"FriendRequest"},
];

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
  displayedColumns: string[] = ['date','user','text','type'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
