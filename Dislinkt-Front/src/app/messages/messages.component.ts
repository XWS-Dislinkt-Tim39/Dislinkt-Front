
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval, Observable } from 'rxjs';
import { Message } from '../core/models/message.model';
import { NotificationSeen } from '../core/models/notification-seen.model';
import { ChatService } from '../core/services/chat.service';
import { ConnectionService } from '../core/services/connection.service';
import { JwtService } from '../core/services/jwt.service';
import { NotificationService } from '../core/services/notification.service';
import { ProfileService } from '../core/services/profile.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {
  connections: any[] = [];
  connectionData: any[] = [];
  messages: any[] = [];
  row: any = {
    id: ""
  };
  newMessage: Message = {
    to: '',
    sender: '',
    text: '',
    time:new Date()
  }
  user:any;
  @ViewChild('scrollMe') private myScrollContainer: ElementRef | undefined;
  selectedChat: any = {};
  messagesList: any[] = []
  myMessage: any = '';
  isChanged:boolean=true;
  sendForm!: FormGroup;
  notificationSeen:NotificationSeen={
    userId:'',
    notificationId:'',
    seen:false
  };
  userId: any;
  messageNotificationCount:any=0;
  notifications:any[]=[];
  constructor(private formBuilder: FormBuilder,
    private connectionService: ConnectionService,
    private jwtService: JwtService,
    private profileService: ProfileService,
    private notificationService:NotificationService,
    private chatService: ChatService) {


  }

  ngOnInit(): void {
    this.userId = this.jwtService.getUserId();
    this.user=this.jwtService.getUserDetails().user;
  console.log(this.user)
    this.sendForm = this.formBuilder.group({
      message: []
    });

    this.getConnections();
    interval(500).subscribe(x => {
      this.getMessageNotification();
      if (this.row.id != '') {
        this.getSelectedChat(this.row);
      }
    });

  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer!.nativeElement.scrollTop = this.myScrollContainer!.nativeElement.scrollHeight;
    } catch (err) { }
  }


  get sendFormControl() {
    return this.sendForm.controls;
  }

  getSelectedChat(row: any) {
   
    this.row = row;
    let count1=0;
    if(this.isChanged){
      this.scrollToBottom();
      this.isChanged=false;
    }
    this.chatService.getChatByFromTo(this.userId, row.id).subscribe(data => {
      if (data != null) {
        if(this.selectedChat.messages!=undefined){
          count1=this.selectedChat.messages.length;
        }
        let name=this.selectedChat.firstName
        this.selectedChat = data;
        this.selectedChat.to=row.id;
        this.selectedChat.firstName = row.userFirstName;
        this.selectedChat.lastName = row.userLastName;
        this.selectedChat.gender = row.gender;
        if(data.messages.length>count1 || this.selectedChat.firstName!=name){
          this.scrollToBottom();
        }
        
      }
      else {
        this.selectedChat.messages = [];
        this.selectedChat.firstName = row.userFirstName;
        this.selectedChat.lastName = row.userLastName;
        this.selectedChat.gender = row.gender;
      }
    }, erorr => {
      alert('Error!')
    })
  }


  showChat(row: any) {
    this.notifications.forEach(element => {
      console.log(row)
      if(element.from==row.id){
        this.notificationSeen.userId = this.userId;
        this.notificationSeen.notificationId = element.id;
        this.notificationSeen.seen = true;
        this.notificationService.updateNotificationSeen(this.notificationSeen).subscribe(data => {
        }, error => {
          alert('Error')
        })
      }
    });
    this.row = row;
  this.isChanged=true;
  }

 getMessageNotification(){
    this.messageNotificationCount=0;
    this.notifications=[];
    this.notificationService.getAllUserNotifications(this.userId).subscribe(data => {
      if(data!=null){
        if(data.messageOn){
          data.notifications.forEach((el: any) => {
            if (el.type == 0 && el.seen == false) {
                  this.messageNotificationCount++;
                  this.notifications.push(el);
            }
          });
        }
        
      }
      localStorage.setItem('messageNotificationCount', this.messageNotificationCount);
      this.connectionData.forEach(element => {
        let count=0;
        this.notifications.forEach(el => {
          if(element.id==el.from){
            count++;
          }
        });
        element.newMessagesCount=count;
      });
    }, error => {
      alert('Error!')
    })
  }
  getConnections() {
    this.connectionService.getConnections(this.userId).subscribe(data => {
      this.connections = data;
      this.getConnectionsData();
    }, error => {
      alert('Error!')
    })
  }

  getConnectionsData() {
    if (this.connections != null) {
      this.connections.forEach((value: any, i: any) => {
        this.profileService.getAboutInfo(value).subscribe(data => {
          this.connectionData.push({
            id: value,
            userFirstName: data.firstName,
            userLastName: data.lastName,
            gender: data.gender
          })
        })
      });
    }
  }

  sendMessage() {
    this.myMessage = this.sendForm.value.message;
    this.newMessage.to = this.selectedChat.to;
    this.newMessage.sender = this.userId;
    this.newMessage.text = this.myMessage;
    this.newMessage.time=new Date();
    this.sendForm.reset();
    this.chatService.addMessage(this.newMessage).subscribe(data => {
      this.selectedChat.messages.push(this.newMessage)
      this.scrollToBottom();
    }, error => {
      alert('Error')
    })
  }

}

