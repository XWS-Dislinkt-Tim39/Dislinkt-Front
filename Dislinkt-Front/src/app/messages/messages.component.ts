
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from '../core/models/message.model';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  messages1:Message[]=[{
    'name':'Ana',
    'lastName':'Anic',
    'message':'Heeej',
    'date':new Date(2022,5,10,10,15)
  },
  {
    'name':'Ja',
    'lastName':'Ja',
    'message':'O Olaa',
    'date':new Date(2022,5,10,10,20)
  },
  {
    'name':'Ana',
    'lastName':'Anic',
    'message':'Sta ima?',
    'date':new Date(2022,5,10,10,22)
  },
  {
    'name':'Ja',
    'lastName':'Ja',
    'message':'Ma radim XML :(',
    'date':new Date(2022,5,10,10,25)
  }];
  messages2:Message[]=[{
    'name':'Marko',
    'lastName':'Markovic',
    'message':'Djes',
    'date':new Date(2022,5,10,10,15)
  },
  {
    'name':'Ja',
    'lastName':'Ja',
    'message':'Heloo',
    'date':new Date(2022,5,10,10,20)
  },
  {
    'name':'Marko',
    'lastName':'Markovic',
    'message':'Kako si',
    'date':new Date(2022,5,10,10,22)
  },
  {
    'name':'Ja',
    'lastName':'Ja',
    'message':'Da se ubijes :D',
    'date':new Date(2022,5,10,10,25)
  }]
  selectedChat:Message[]=[{
    'name':'sd',
    'lastName':'sd',
    'message':'',
    'date':new Date()
  }];
  messagesList:any[]=[this.messages1,this.messages2]
  myMessage:any='';
  sendForm!: FormGroup;
  constructor(    private formBuilder: FormBuilder,) { 
    
  }

  ngOnInit(): void {
    this.selectedChat=this.messages1;
    this.sendForm = this.formBuilder.group({
      message: []
    });
  }

  get sendFormControl() {
    return this.sendForm.controls;
  }
  showChat(row:Message[]){
  this.selectedChat=row;
  }

  sendMessage(){
    this.myMessage= this.sendForm.value.message;
    this.selectedChat.push({
      'name':'Ja',
      'lastName':'Ja',
      'message':this.myMessage,
      'date':new Date()
    })
    this.sendForm.reset();
  }

}
