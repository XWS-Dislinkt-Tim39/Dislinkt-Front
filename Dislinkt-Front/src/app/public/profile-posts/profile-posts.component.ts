import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from 'src/app/core/services/post.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-profile-posts',
  templateUrl: './profile-posts.component.html',
  styleUrls: ['./profile-posts.component.scss']
})
export class ProfilePostsComponent implements OnInit {
  routeState: any;
  selectedProfile:any;
  posts:any[]=[];
  sortedPosts:any[]=[];
  commentStyle: string = '';
  constructor( private router: Router, private postService: PostService, private profileService:ProfileService) { 
    this.routeState = this.router.getCurrentNavigation()?.extras.state;
    this.selectedProfile = this.routeState;
    this.commentStyle = 'reaction-button';
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts(){
    this.postService.getUserPosts(this.selectedProfile.id).subscribe(data=>{
      this.posts=data;
      this.posts.forEach((value,i: any)=>{
        value.showComments=false;
        value.newCommentText='';
        this.getCommentUser(value);
    });
    this.sortedPosts = this.posts.sort(
      (objA, objB) => new Date(objB.dateTimeOfPublishing).getTime() - new Date(objA.dateTimeOfPublishing).getTime(),
    );
    },error=>{
      alert('Error! Try again!')
    })
  }

  getCommentUser(post:any){
    post.comments.forEach((value:any,i: any)=>{
      this.profileService.getAboutInfo(value.userId).subscribe(data=>{
        value.userFirstName=data.firstName;
        value.userLastName=data.lastName;
      })
  });
  }

  isLiked(index:any):boolean{
    if(this.posts[index].likes.indexOf(this.selectedProfile.id) !== -1) {
      return true
    }
    return false
  }

  isDisliked(index:any):boolean{
    if(this.posts[index].dislikes.indexOf(this.selectedProfile.id) !== -1) {
      return true
    }
    return false
  }

  showComments(index:any){
    this.posts[index].showComments=!this.posts[index].showComments;
  }
}
