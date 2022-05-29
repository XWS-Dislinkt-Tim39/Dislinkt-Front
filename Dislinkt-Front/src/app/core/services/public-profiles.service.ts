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
export class PublicProfilesService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient
    ) { }


    getAllUsers(): Observable<any> {
        return this.http.get(`${environment.api_url}get-all-users`, { headers: this.headers, responseType: 'json' });
    }
    getAllPublicUsers(): Observable<any> {
        return this.http.get(`${environment.api_url}get-public-users`, { headers: this.headers, responseType: 'json' });
    }
    searchUser(username: string): Observable<any> {
        return this.http.get(`${environment.api_url}serach-users`, {
            params: { username: username }, headers: this.headers, responseType: 'json'
        });
    }



}
