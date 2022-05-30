import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.scss']
})
export class AccountInfoComponent implements OnInit {
  @Input() selectedProfile: any;  
  gender:string='';
  constructor() { }

  ngOnInit(): void {
    if(this.selectedProfile.gender=='1'){
      this.gender='Female'
    }
    else{
      this.gender='Male'
    }
  }

}
