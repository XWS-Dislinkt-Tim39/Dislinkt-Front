import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Connection } from '../models/connection.model';
import { NewUserNode } from '../models/new-user-node.model';

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient
  ) { }

  
  followPublicUser(connection: Connection): Observable<any> {
    return this.http.post(`${environment.url}Connections/follow`, connection,
      { headers: this.headers, responseType: 'json' });
  }
  sendRequest(connection: Connection): Observable<any> {
    return this.http.post(`${environment.url}Connections/createFollowRequest`, connection,
      { headers: this.headers, responseType: 'json' });
  }
  unfollowUser(connection: Connection): Observable<any> {
    return this.http.post(`${environment.url}Connections/unfollow`, connection,
      { headers: this.headers, responseType: 'json' });
  }
  approveFollow(follow: Connection): Observable<any> {
    return this.http.post(`${environment.url}Connections/approveFollow`, follow,
      { headers: this.headers, responseType: 'json' });
  }
  rejectFollow(follow: Connection): Observable<any> {
    return this.http.post(`${environment.url}Connections/rejectFollow`, follow,
      { headers: this.headers, responseType: 'json' });
  }
  getConnections(souceId: string): Observable<any> {
    return this.http.get(`${environment.url}Connections/getFollowing`,
      { params: { sourceId: souceId },headers: this.headers, responseType: 'json' });
  }

  getFollowRequests(souceId: string): Observable<any> {
    return this.http.get(`${environment.url}Connections/getFollowRequests`,
      { params: { sourceId: souceId },headers: this.headers, responseType: 'json' });
  }

  blockUser(connection: Connection): Observable<any> {
    return this.http.post(`${environment.url}Connections/block`, connection,
      { headers: this.headers, responseType: 'json' });
  }

  unblockUser(connection: Connection): Observable<any> {
    return this.http.post(`${environment.url}Connections/unblock`, connection,
      { headers: this.headers, responseType: 'json' });
  }

  getBlocked(souceId: string): Observable<any> {
    return this.http.get(`${environment.url}Connections/getBlocked`,
      { params: { sourceId: souceId },headers: this.headers, responseType: 'json' });
  }

  getFollowRecommendations(souceId: string): Observable<any> {
    return this.http.get(`${environment.url}Connections/getFollowRecommendations`,
      { params: { sourceId: souceId },headers: this.headers, responseType: 'json' });
  }
}
