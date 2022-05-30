import { User } from './../models/user.model';
import { UserSignIn } from './../models/user-sign-in.model';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtService } from './jwt.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { UpdateUser } from '../models/updateUser.model';
import { UserExperience } from '../models/user-experience.model';
import { UpdateUserExperience } from '../models/update-user-experience.model';
import { UserEducation } from '../models/user-education.model';
import { UpdateUserEducation } from '../models/update-user-education.model';
import { NewSkill } from '../models/new-skill.model';
import { NewInterest } from '../models/new-interest.model';

@Injectable({
    providedIn: 'root'
})
export class ProfileService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient
    ) { }


    getAboutInfo(userId:string): Observable<any> {
        return this.http.get(`${environment.api_url}get-user`, { params: {
            id: userId
          }, headers: this.headers, responseType: 'json' });
    }
    editAboutInfo(editedUser: UpdateUser): Observable<any> {
      return this.http.post(`${environment.api_url}update-user`, editedUser, { headers: this.headers, responseType: 'json' });
    }

    addWorkExperience(experience:UserExperience): Observable<any> {
        return this.http.post(`${environment.api_url}add-work-experience`,experience, { headers: this.headers, responseType: 'json' });
    }
    editWorkExperience(experience:UpdateUserExperience): Observable<any> {
        return this.http.post(`${environment.api_url}update-work-experience`,experience, { headers: this.headers, responseType: 'json' });
    }

    addEducation(education:UserEducation): Observable<any> {
        return this.http.post(`${environment.api_url}add-education`,education, { headers: this.headers, responseType: 'json' });
    }
    editEducation(education:UpdateUserEducation): Observable<any> {
        return this.http.post(`${environment.api_url}update-education`,education, { headers: this.headers, responseType: 'json' });
    }
 

    getAllSkills(): Observable<any> {
        return this.http.get(`${environment.api_url}get-all-skills`,{ headers: this.headers, responseType: 'json' });
    }
    getUserSkills(userId:string): Observable<any> {
        return this.http.get(`${environment.api_url}get-user-skills`,{ params: {
            id: userId
          },headers: this.headers, responseType: 'json' });
    }
    addNewSkill(skill:NewSkill): Observable<any> {
        return this.http.post(`${environment.api_url}add-new-skill`,skill, { headers: this.headers, responseType: 'json' });
    }

    getAllInterests(): Observable<any> {
        return this.http.get(`${environment.api_url}get-all-interests`,{ headers: this.headers, responseType: 'json' });
    }
    getUserInterests(userId:string): Observable<any> {
        return this.http.get(`${environment.api_url}get-user-interests`,{ params: {
            id: userId
          },headers: this.headers, responseType: 'json' });
    }
    addNewInterest(interest:NewInterest): Observable<any> {
        return this.http.post(`${environment.api_url}add-new-interest`,interest, { headers: this.headers, responseType: 'json' });
    }





}
