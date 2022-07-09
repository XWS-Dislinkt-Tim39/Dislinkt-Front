import { Component, OnInit } from '@angular/core';
import { Chart, registerables} from 'node_modules/chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-jobs-chart',
  templateUrl: './jobs-chart.component.html',
  styleUrls: ['./jobs-chart.component.scss']
})
export class JobsChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const myChart = new Chart("jobsChart", {
      type: 'bar',
      data: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
          datasets: [{
              label: 'Number of jobs for every month',
              data: [12, 19, 3, 5, 2, 3, 30, 50, 15, 24, 38, 14],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
                  
              }
          }
      }
  });
  }

}
