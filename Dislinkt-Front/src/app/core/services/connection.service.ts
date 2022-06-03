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

  registerUser(user: NewUserNode): Observable<any> {
    return this.http.post(`${environment.connect_url}registerUser`, user,
      { headers: this.headers, responseType: 'json' });
  }
  followPublicUser(connection: Connection): Observable<any> {
    return this.http.post(`${environment.connect_url}follow`, connection,
      { headers: this.headers, responseType: 'json' });
  }
  approveFollow(follow: Connection): Observable<any> {
    return this.http.post(`${environment.connect_url}approveFollow`, follow,
      { headers: this.headers, responseType: 'json' });
  }

  getFollowRequests(souceId: string): Observable<any> {
    return this.http.get(`${environment.connect_url}getFollowRequests`,
      { params: { sourceId: souceId },headers: this.headers, responseType: 'json' });
  }
}
