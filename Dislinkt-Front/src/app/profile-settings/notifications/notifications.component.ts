import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  connectionRequest: boolean=true;
  acceptedRejected: boolean=true;
  jobPosts: boolean=true;
  profilePosts: boolean=true;
  messages: boolean=true;
  constructor() { }

  ngOnInit(): void {
  }
  confirm() {}

}
