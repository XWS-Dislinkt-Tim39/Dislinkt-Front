import { Component, OnInit } from '@angular/core';

export interface PeriodicElement {
  position: string;
  level: string;
  average: number;
  min: number;
  max: number;
  maxx: number;
}
const ELEMENT_DATA: PeriodicElement[] = [
  {position: "Software Developer", level:"Junior",average:750,min:600,max:1000,maxx:500},
  {position: "Software Developer", level:"Medior",average:1300,min:1000,max:1600,maxx:500},
  {position: "Product Menager", level:"Senior",average:2000,min:1600,max:2300,maxx:500},
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
  displayedColumns: string[] = ['position','level','min','max'];
  dataSource = ELEMENT_DATA;
  constructor() { }

  ngOnInit(): void {
  }

}
