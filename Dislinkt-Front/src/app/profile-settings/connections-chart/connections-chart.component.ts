import { Component, OnInit } from '@angular/core';
import { Chart, registerables} from 'node_modules/chart.js';
import { ProfileService } from 'src/app/core/services/profile.service';

Chart.register(...registerables);

@Component({
  selector: 'app-connections-chart',
  templateUrl: './connections-chart.component.html',
  styleUrls: ['./connections-chart.component.scss']
})
export class ConnectionsChartComponent implements OnInit {
    registrations:any=[];
    months:number[]=[0,0,0,0,0,0,0,0,0,0,0,0];  
    constructor(private profileService: ProfileService) { }
    delay(ms: number) {
        return new Promise( resolve => setTimeout(resolve, ms) );
    }
    async ngOnInit(): Promise<void> {
        this.getAllActivities();
        await this.delay(200);
        this.getMonthsValues();
        await this.delay(200);
        const myChart = new Chart("connectionsChart", {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                data:this.months,
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
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Number of registrations for every month',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    display: false
                }
            }
        }
    });
    
    }

    getAllActivities(){
        this.profileService.getAllActivities().subscribe(data=>{
        data.forEach((element :any)=> {
            if(element.type==0){
                this.registrations.push(element);
                console.log(this.registrations)
            }
        });
        })
    }

    getMonthsValues(){
        this.registrations.forEach((element: any) => {
            let i=new Date(element.date).getMonth();
            this.months[i]=this.months[i]+1;
        });
    }

}
