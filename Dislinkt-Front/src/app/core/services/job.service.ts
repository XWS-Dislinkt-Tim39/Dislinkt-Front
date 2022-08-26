import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { NewJobOffer } from '../models/new-job-offer.model';
import { Skill } from '../models/skill.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient
  ) { }

  addJobOffer(newJob: NewJobOffer): Observable<any> {
    return this.http.post(`${environment.url}Jobs/add-job-offer`, newJob,
      { headers: this.headers, responseType: 'json' });
  }

  getAll(): Observable<any> {
    return this.http.get(`${environment.url}Jobs/get-all-jobs`,
      { headers: this.headers, responseType: 'json' });
  }

  getAllByUser(userId: string): Observable<any> {
    return this.http.get(`${environment.url}Jobs/get-user-jobs`,
      {
        params: { userId: userId },
        headers: this.headers, responseType: 'json'
      });
  }

  searchPost(positionName: string): Observable<any> {
    return this.http.get(`${environment.url}Jobs/search-job`, {
      params: { searchParameter: positionName }, headers: this.headers, responseType: 'json'
    });
  }

  addAppSkill(newSkill: any): Observable<any> {
    return this.http.post(`${environment.url}Jobs/addSkill`, newSkill,
    { headers: this.headers, responseType: 'json' });
  }

  getRecommendedJobs(sourceId: string): Observable<any> {
    return this.http.get(`${environment.url}Jobs/getJobRecommendations`,
      {
        params: { sourceId: sourceId },
        headers: this.headers, responseType: 'json'
      });
  }

  
}