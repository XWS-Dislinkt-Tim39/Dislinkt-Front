import { Component, OnInit } from '@angular/core';
import { Activity } from 'src/app/core/models/activity.model';
import { ProfileService } from 'src/app/core/services/profile.service';

export interface PeriodicElement {
  date: string;
  user: string;
  text: string;
  type: string;
}
const activities_table: Activity[] = [
  {date: new Date(), userId:"Sara Saric",text:"created post",type:'Job'},
];

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.scss']
})
export class AdminReportComponent implements OnInit {
 
  activities:any[]=[];
  yearView: boolean = true;
  monthView: boolean = false;
  weekView: boolean = false;
  activitiesShow:Activity[]=[];
  displayedColumns: string[] = ['date','user','text','type'];
  dataSource = activities_table;
  jobsCount:number=0;
  postCount:number=0;
  registrationCount:number=0;

  constructor(private profileService:ProfileService) { }

  ngOnInit(): void {
    this.getAllActivities();
  }
  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  getAllActivities(){
    this.profileService.getAllActivities().subscribe(async data=>{
      this.activities=data;
      this.activities.reverse();
      this.activities.forEach(element => {
        this.profileService.getAboutInfo(element.userId).subscribe(data1=>{
          this.activitiesShow.push({
            date: element.date,
            text:element.text,
            userId:data1.firstName+"  "+data1.lastName,
            type:this.getType(element.type)
          })
        
        })
       
      });
      await this.delay(500);
      this.dataSource=this.activitiesShow
     
    },error=>{
      alert('Error!')
    })
  }

  getType(type:any):string{
    if(type==0){
      this.registrationCount++;
      return "Registration"
    }else if(type==1){
      this.postCount++;
      return "Post"
    }else if(type==2){
      this.jobsCount++;
      return "Job"
    }else{
      return "Connection"
    }
  }

}
