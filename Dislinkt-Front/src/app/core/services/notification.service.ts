import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
      private http: HttpClient
  ) { }

  getUserNotifications(userId: string): Observable<any> {
    return this.http.get(`${environment.notification_url}get-by-userId`, { params: {
      userId: userId
    },headers: this.headers, responseType: 'json' });
  }
}
