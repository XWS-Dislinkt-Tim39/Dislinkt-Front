import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewNotificationSettingsData } from '../models/new-notification-settings-data';
import { NotificationSeen } from '../models/notification-seen.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
      private http: HttpClient
  ) { }

  getAllUserNotifications(userId: string): Observable<any> {
    return this.http.get(`${environment.notification_url}get-all-by-userId`, { params: {
      userId: userId
    },headers: this.headers, responseType: 'json' });
  }
  getWitoutMessagesUserNotifications(userId: string): Observable<any> {
    return this.http.get(`${environment.notification_url}get-without-messages-by-userId`, { params: {
      userId: userId
    },headers: this.headers, responseType: 'json' });
  }

  updateNotificationSeen(comment: NotificationSeen): Observable<any> {
    return this.http.post(`${environment.notification_url}update-notification-seen`, comment, { headers: this.headers, responseType: 'json' });
  }
  updateNotificationSettings(settings:NewNotificationSettingsData): Observable<any> {
    return this.http.post(`${environment.notification_url}update-notification-settings`,settings, { headers: this.headers, responseType: 'json' });
}

}
