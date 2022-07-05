import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr'; 
import { ChatMessage } from './core/models/chat-message.model';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignalrService {
  private connection = new signalR.HubConnectionBuilder()
  .configureLogging(signalR.LogLevel.Debug)
  .withUrl("https://localhost:44379/chatsocket", {
    skipNegotiation: true,
    transport: signalR.HttpTransportType.WebSockets
  })
  .build();
readonly POST_URL = "https://localhost:44379/api/Chat/send"

private receivedMessageObject: ChatMessage = new ChatMessage();
  private sharedObj = new Subject<ChatMessage>();

  constructor(private http: HttpClient) { 
    this.connection.onclose(async () => {
      await this.start();
    });
   //this.connection.on("ReceiveOne", (user: any, message: any) => { this.mapReceivedMessage(user, message); });
   this.connection.on("Receive", (user: any,reciever:any, message: any) => { this.mapReceivedMessage(user,reciever, message); });
   this.start();                 
  }

  public async start() {
    try {
      await this.connection.start();
      console.log("connected");
    } catch (err) {
      console.log(err);
      setTimeout(() => this.start(), 5000);
    } 
  }

  private mapReceivedMessage(user: string,reciever:string, message: string): void {
    this.receivedMessageObject.user = user;
    this.receivedMessageObject.reciever = reciever;
    this.receivedMessageObject.text = message;
    this.sharedObj.next(this.receivedMessageObject);
 }

 /* ****************************** Public Mehods **************************************** */

  // Calls the controller method
  public broadcastMessage(msgDto: any) {
    this.http.post(this.POST_URL, msgDto).subscribe(data => console.log(data));
    // this.connection.invoke("SendMessage1", msgDto.user, msgDto.msgText).catch(err => console.error(err));    // This can invoke the server method named as "SendMethod1" directly.
  }

  public retrieveMappedObject(): Observable<ChatMessage> {
    return this.sharedObj.asObservable();
  }

}
