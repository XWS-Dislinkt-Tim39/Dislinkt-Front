import { AddPostComponent } from './../add-post/add-post.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JwtService } from 'src/app/core/services/jwt.service';
import { PostService } from 'src/app/core/services/post.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  dilogRef: any;
  isLike: boolean = false;
  isDislike: boolean = false;
  isComment: boolean = false;
  likeStyle: string = '';
  dislikeStyle: string = '';
  commentStyle: string = '';
  posts:any[]=[]
  sortedPosts:any[]=[]
userDetails:any;
user:any;
  constructor(
    public dialog: MatDialog,
    private jwtService: JwtService,
    private postService:PostService) {

    this.likeStyle = 'reaction-button';
    this.dislikeStyle = 'reaction-button';
    this.commentStyle = 'reaction-button';
  }

  ngOnInit(): void {
    this.userDetails=JSON.parse(localStorage.getItem('userDetails') || '');
    this.user=this.userDetails.user;
    this.getPosts();
  }

  
  getPosts(){
    this.postService.getUserPosts(this.user.id).subscribe(data=>{
      this.posts=data;
      this.posts.forEach((value,i: any)=>{
        value.showComments=false;
    
    });
    this.sortedPosts = this.posts.sort(
      (objA, objB) => new Date(objB.dateTimeOfPublishing).getTime() - new Date(objA.dateTimeOfPublishing).getTime(),
    );
    },error=>{
      alert('Error! Try again!')
    })
  }

  openAddDialog(event: { stopPropagation: () => void; }) {
    this.dilogRef = this.dialog.open(AddPostComponent, {
      data: {
      }
    });
  }

  addLike(post:any,index:any){
    if(this.posts[index].dislikes.indexOf(this.user.id) !== -1) {
      this.removeDislike(post,index);
    }
    this.posts[index].likes.push(this.user.id);
    this.postService.addLikePost(this.user.id,post.id).subscribe((data: any) => {
     console.log(post.id)

    },
      error => {
        console.log(error.error.message);
      });
    
  }

  removeLike(post:any,index:any){
    this.posts[index].likes.forEach((value: { id: any; },i: any)=>{
      if(value==this.user.id) {
        this.posts[index].likes.splice(i,1);
      }  
  });
  this.postService.removeLikePost(this.user.id,post.id).subscribe((data: any) => {
    console.log(post.id) },
     error => {
       console.log(error.error.message);
     });
  }
  isLiked(index:any):boolean{
    if(this.posts[index].likes.indexOf(this.user.id) !== -1) {
      return true
    }
    return false
  }
  addDislike(post:any,index:any){
    if(this.posts[index].likes.indexOf(this.user.id) !== -1) {
     this.removeLike(post,index);
    }
    this.posts[index].dislikes.push(this.user.id);
    this.postService.addDislikePost(this.user.id,post.id).subscribe((data: any) => {
     console.log(post.id)
    },
      error => {
        console.log(error.error.message);
      });
    
  }
  removeDislike(post:any,index:any){
    this.posts[index].dislikes.forEach((value: { id: any; },i: any)=>{
      if(value==this.user.id) {
        this.posts[index].dislikes.splice(i,1);
      }  
  });
  this.postService.removeDislikePost(this.user.id,post.id).subscribe((data: any) => {
    console.log(post.id) },
     error => {
       console.log(error.error.message);
     });
  }
  isDisliked(index:any):boolean{
    if(this.posts[index].dislikes.indexOf(this.user.id) !== -1) {
      return true
    }
    return false
  }
  isCommented(index:any):boolean{
    if(this.posts[index].comments.userId.indexOf(this.user.id) !== -1) {
      return true
    }
    return false
  }
  showComments(index:any){
    this.posts[index].showComments=!this.posts[index].showComments;
  }
}
