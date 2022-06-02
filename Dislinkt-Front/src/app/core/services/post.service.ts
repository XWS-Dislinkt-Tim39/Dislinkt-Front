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
import { NewPost } from '../models/new-post.model';
import { NewComment } from '../models/new-comment.model';

@Injectable({
    providedIn: 'root'
})
export class PostService {
    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    constructor(
        private http: HttpClient
    ) { }
   
    addNewPost(post: NewPost): Observable<any> {
      return this.http.post(`${environment.post_url}add-post`, post, { headers: this.headers, responseType: 'json' });
    }
    addLikePost(userid:string,postId: string): Observable<any> {
      return this.http.get(`${environment.post_url}add-like`, { params: {
        userId:userid,
        postId: postId
      },headers: this.headers, responseType: 'json' });
    }
    removeLikePost(userid:string,postId: string): Observable<any> {
      return this.http.get(`${environment.post_url}remove-like`, { params: {
        userId:userid,
        postId: postId
      },headers: this.headers, responseType: 'json' });
    }
    addDislikePost(userid:string,postId: string): Observable<any> {
      return this.http.get(`${environment.post_url}add-dislike`, { params: {
        userId:userid,
        postId: postId
      },headers: this.headers, responseType: 'json' });
    }
    removeDislikePost(userid:string,postId: string): Observable<any> {
      return this.http.get(`${environment.post_url}remove-dislike`, { params: {
        userId:userid,
        postId: postId
      },headers: this.headers, responseType: 'json' });
    }
    getUserPosts(userId: string): Observable<any> {
      return this.http.get(`${environment.post_url}user-posts`, { params: {
        id: userId
      },headers: this.headers, responseType: 'json' });
    }
    addComment(comment: NewComment): Observable<any> {
      return this.http.post(`${environment.post_url}add-comment`, comment, { headers: this.headers, responseType: 'json' });
    }



}