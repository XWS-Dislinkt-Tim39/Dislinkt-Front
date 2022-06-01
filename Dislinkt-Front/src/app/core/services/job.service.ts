import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { NewJobOffer } from '../models/new-job-offer.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(
      private http: HttpClient
  ) { }

  addJobOffer(newJob:NewJobOffer): Observable<any> {
      return this.http.post(`${environment.job_url}add-job-offer`,newJob, 
      { headers: this.headers, responseType: 'json' });
  }

  getAll(): Observable<any> {
    return this.http.get(`${environment.job_url}get-all-jobs`, 
    { headers: this.headers, responseType: 'json' });
  }

  getAllByUser(userId: string): Observable<any> {
    return this.http.get(`${environment.job_url}get-user-jobs`, 
    { 
    params: {userId: userId},
    headers: this.headers, responseType: 'json' });
    }
}