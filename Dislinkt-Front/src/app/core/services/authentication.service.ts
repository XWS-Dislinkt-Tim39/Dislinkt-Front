import { User } from './../models/user.model';
import { UserSignIn } from './../models/user-sign-in.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private jwtService: JwtService
  ) { }

  signIn(user: UserSignIn): Observable<any> {
    return this.http.post(`${environment.api_url}Account/authenticate`, user, { headers: this.headers, responseType: 'json' });
  }

  register(user: User): Observable<any> {
    return this.http.post(`${environment.api_url}Accounts/register`, user, { headers: this.headers, responseType: 'json' });
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
