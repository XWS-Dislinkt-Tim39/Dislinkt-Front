import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Message } from '../models/message.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient
  ) { }
  getChatByFromTo(fromId: string, toId: string): Observable<any> {
    return this.http.get(`${environment.url}Chat/get-by-from-to`, {
      params: {
        from: fromId,
        to: toId
      }, headers: this.headers, responseType: 'json'
    });
  }

  addMessage(message: Message): Observable<any> {
    return this.http.post(`${environment.url}Chat/add-new-message`, message,
      { headers: this.headers, responseType: 'json' });
  }
  createChat(from: string, to: string): Observable<any> {
    return this.http.post(`${environment.url}Chat/create-chat`, { from: from, to: to },
      { headers: this.headers, responseType: 'json' });
  }
  deleteChat(from: string, to: string): Observable<any> {
    return this.http.post(`${environment.url}Chat/delete-chat`, { from: from, to: to },
      { headers: this.headers, responseType: 'json' });
  }


}
