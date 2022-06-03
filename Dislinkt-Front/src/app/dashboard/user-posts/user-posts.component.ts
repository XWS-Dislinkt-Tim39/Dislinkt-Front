import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewComment } from 'src/app/core/models/new-comment.model';
import { JwtService } from 'src/app/core/services/jwt.service';
import { PostService } from 'src/app/core/services/post.service';
import { ProfileService } from 'src/app/core/services/profile.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit {
  routeState: any;
  selectedUser:any;
  posts:any[]=[];
  sortedPosts:any[]=[];
  commentStyle: string = '';
  newComment: NewComment = {
    text: '',
    publisherId: '',
    postId: ''
  }
  userId:any;
  user:any;
  constructor( private router: Router, private postService: PostService, private profileService:ProfileService,
    private jwtService:JwtService) { 
    this.routeState = this.router.getCurrentNavigation()?.extras.state;
    this.selectedUser = this.routeState;
    this.commentStyle = 'reaction-button';
  }

  ngOnInit(): void {
    this.getPosts();
  }
  getPosts(){
    this.userId=this.jwtService.getUserId();
this.user=this.jwtService.getUserDetails();
    this.postService.getUserPosts(this.selectedUser.id).subscribe(data=>{
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
        value.gender=data.gender;
      })
  });
  }

  addLike(post: any, index: any) {
    if (this.posts[index].dislikes.indexOf(this.userId) !== -1) {
      this.removeDislike(post, index);
    }
    this.posts[index].likes.push(this.userId);
    this.postService.addLikePost(this.userId, post.id).subscribe((data: any) => {
      console.log(post.id)

    },
      error => {
        console.log(error.error.message);
      });

  }

  removeLike(post: any, index: any) {
    this.posts[index].likes.forEach((value: { id: any; }, i: any) => {
      if (value == this.userId) {
        this.posts[index].likes.splice(i, 1);
      }
    });
    this.postService.removeLikePost(this.userId, post.id).subscribe((data: any) => {
      console.log(post.id)
    },
      error => {
        console.log(error.error.message);
      });
  }
  isLiked(index: any): boolean {
    if(this.posts[index].likes==null)
      return false;
    if (this.posts[index].likes.indexOf(this.userId) !== -1) {
      return true
    }
    return false
  }
  addDislike(post: any, index: any) {
    if (this.posts[index].likes.indexOf(this.userId) !== -1) {
      this.removeLike(post, index);
    }
    this.posts[index].dislikes.push(this.userId);
    this.postService.addDislikePost(this.userId, post.id).subscribe((data: any) => {
      console.log(post.id)
    },
      error => {
        console.log(error.error.message);
      });

  }
  removeDislike(post: any, index: any) {
    this.posts[index].dislikes.forEach((value: { id: any; }, i: any) => {
      if (value == this.userId) {
        this.posts[index].dislikes.splice(i, 1);
      }
    });
    this.postService.removeDislikePost(this.userId, post.id).subscribe((data: any) => {
      console.log(post.id)
    },
      error => {
        console.log(error.error.message);
      });
  }
  isDisliked(index: any): boolean {
    if (this.posts[index].dislikes.indexOf(this.userId) !== -1) {
      return true
    }
    return false
  }
  isCommented(index: any): boolean {
    if (this.posts[index].comments.userId.indexOf(this.userId) !== -1) {
      return true
    }
    return false
  }
  showComments(index: any) {
    this.posts[index].showComments = !this.posts[index].showComments;
  }
  addComment(post: any, index: any) {
    this.newComment.postId = post.id;
    this.newComment.publisherId = this.userId;
    this.newComment.text = this.posts[index].newCommentText;
    console.log(this.newComment);

    this.postService.addComment(this.newComment).subscribe(data => {
      let comment: any = this.newComment;
      comment.userFirstName = this.user.user.firstName;
      comment.userLastName = this.user.user.lastName;
      comment.gender = this.user.user.gender;
      this.posts[index].comments.push(comment);
      this.posts[index].newCommentText = '';
    }, error => {
      alert('Error!Try again!')
    })

  }

}
