import { User } from './../models/user.model';
import { UserSignIn } from './../models/user-sign-in.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private headers1 = new HttpHeaders({ 'Content-Type': 'text/plain' });

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

  signUp(user: UserSignIn): Observable<any> {
    return this.http.get(`${environment.api_url}sign-up`, {
      params: {
        emailAddress: user.emailAddress,
        password: user.password
      }, headers: this.headers, responseType: 'json'
    });
  }

  register(user: User): Observable<any> {
    return this.http.post(`${environment.api_url}register-user`, user, { headers: this.headers, responseType: 'json' });
  }
  approve(id: string): Observable<any> {
    return this.http.post(`${environment.api_url}approve-user/${id}`, { headers: this.headers, responseType: 'json' });
  }

  logout(): void {
    this.jwtService.destroyUserDetails();
  }

  isAuthenticated(): boolean {
    if (!this.jwtService.getUserDetails()) {
      return false;
    }
    return true;
  }

  getRole(): string {
    return this.jwtService.getRole();
  }
}
