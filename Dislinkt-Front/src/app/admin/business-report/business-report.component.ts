import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-business-report',
  templateUrl: './business-report.component.html',
  styleUrls: ['./business-report.component.scss']
})
export class BusinessReportComponent implements OnInit {
  posts: any=0;
  jobs: any=0;
  connections: any=0;
  yearView: boolean = true;
  monthView: boolean = false;
  weekView: boolean = false;

  constructor() { }

  /*public chartType = 'line';

  public chartDatasets = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'My First dataset' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'My Second dataset' }
  ];

  public chartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public chartColors = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptions: any = {
    responsive: true
  };

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels1 = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  public barChartLabels2 = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15',
    '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'];
  public barChartLabels3 = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData1 = [
    { data: [10], label: 'Number of reservations' },
  ];
  public barChartData2 = [
    { data: [10], label: 'Number of reservations' },
  ];
  public barChartData3 = [
    { data: [10], label: 'Number of reservations' },
  ];*/

  ngOnInit(): void {}

  /*trueYear() {
    this.yearView = true;
    this.monthView = false;
    this.weekView = false;
  }
  trueMonth() {
    this.yearView = false;
    this.monthView = true;
    this.weekView = false;
  }
  trueWeek() {
    this.yearView = false;
    this.monthView = false;
    this.weekView = true;
  }

  chartClicked(event: any) {
    console.log(event);
  }

  chartHovered(event: any) {
    console.log(event);
  }*/
}
