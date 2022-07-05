
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { interval, Observable } from 'rxjs';
import { Message } from '../core/models/message.model';
import { ChatService } from '../core/services/chat.service';
import { ConnectionService } from '../core/services/connection.service';
import { JwtService } from '../core/services/jwt.service';
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
    chatId: '',
    sender: '',
    text: ''
  }
  @ViewChild('scrollMe') private myScrollContainer: ElementRef | undefined;
  selectedChat: any = {};
  messagesList: any[] = []
  myMessage: any = '';
  isChanged:boolean=true;
  sendForm!: FormGroup;
  userId: any;
  constructor(private formBuilder: FormBuilder,
    private connectionService: ConnectionService,
    private jwtService: JwtService,
    private profileService: ProfileService,
    private chatService: ChatService) {


  }

  ngOnInit(): void {
    this.userId = this.jwtService.getUserId();
    this.sendForm = this.formBuilder.group({
      message: []
    });

    this.getConnections();
    interval(100).subscribe(x => {
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
        this.selectedChat.firstName = row.userFirstName;
        this.selectedChat.lastName = row.userLastName;
        if(data.messages.length>count1 || this.selectedChat.firstName!=name){
          this.scrollToBottom();
        }
        
      }
      else {
        this.selectedChat.messages = [];
        this.selectedChat.firstName = row.userFirstName;
        this.selectedChat.lastName = row.userLastName;
      }
    }, erorr => {
      alert('Error!')
    })
  }


  showChat(row: any) {
    this.row = row;
  this.isChanged=true;

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
            userLastName: data.lastName
          })
        })
      });
    }

  }

  sendMessage() {
    this.myMessage = this.sendForm.value.message;
    this.newMessage.chatId = this.selectedChat.id;
    this.newMessage.sender = this.userId;
    this.newMessage.text = this.myMessage;
    this.sendForm.reset();
    this.chatService.addMessage(this.newMessage).subscribe(data => {
      this.selectedChat.messages.push(this.newMessage)
      this.scrollToBottom();
    }, error => {
      alert('Error')
    })
  }

}

