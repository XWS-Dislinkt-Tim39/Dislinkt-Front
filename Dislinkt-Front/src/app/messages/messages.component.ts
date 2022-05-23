
import { Component, OnInit } from '@angular/core';
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
    'massage':'Heeej',
    'date':new Date(2022,5,10,10,15)
  },
  {
    'name':'Ja',
    'lastName':'Ja',
    'massage':'O Olaa',
    'date':new Date(2022,5,10,10,20)
  },
  {
    'name':'Ana',
    'lastName':'Anic',
    'massage':'Sta ima?',
    'date':new Date(2022,5,10,10,22)
  },
  {
    'name':'Ja',
    'lastName':'Ja',
    'massage':'Ma radim XML :(',
    'date':new Date(2022,5,10,10,25)
  }];
  messages2:Message[]=[{
    'name':'Marko',
    'lastName':'Markovic',
    'massage':'Djes',
    'date':new Date(2022,5,10,10,15)
  },
  {
    'name':'Ja',
    'lastName':'Ja',
    'massage':'Heloo',
    'date':new Date(2022,5,10,10,20)
  },
  {
    'name':'Marko',
    'lastName':'Markovic',
    'massage':'Kako si',
    'date':new Date(2022,5,10,10,22)
  },
  {
    'name':'Ja',
    'lastName':'Ja',
    'massage':'Da se ubijes :D',
    'date':new Date(2022,5,10,10,25)
  }]
  constructor() { }

  ngOnInit(): void {
  }

}
