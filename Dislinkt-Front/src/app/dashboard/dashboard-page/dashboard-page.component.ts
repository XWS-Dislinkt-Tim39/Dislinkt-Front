import { AddPostComponent } from './../add-post/add-post.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { JwtService } from 'src/app/core/services/jwt.service';
import { PostService } from 'src/app/core/services/post.service';
import { identifierModuleUrl } from '@angular/compiler';
import { NewComment } from 'src/app/core/models/new-comment.model';
import { ProfileService } from 'src/app/core/services/profile.service';
import { ConnectionService } from 'src/app/core/services/connection.service';
import { Connection } from 'src/app/core/models/connection.model';
import { ChatService } from 'src/app/core/services/chat.service';
import { DomSanitizer } from '@angular/platform-browser';

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
  postsCount: any = 1;
  posts: any[] = []
  sortedPosts: any[] = [];
  profiles: any[] = [];
  newComment: NewComment = {
    text: '',
    publisherId: '',
    postId: ''
  }
  userDetails: any;
  user: any;
  requests: any[] = [];
  followRequests: any[] = [];
  myConnections: any[] = [];
  allPosts: any[] = [];
  userId: any;
  recommendation: any[] = [];

  constructor(
    public dialog: MatDialog,
    private jwtService: JwtService,
    private postService: PostService,
    private profileService: ProfileService,
    private connectionService: ConnectionService,
    private chatService: ChatService,
    private _sanitizer: DomSanitizer) {

    this.likeStyle = 'reaction-button';
    this.dislikeStyle = 'reaction-button';
    this.commentStyle = 'reaction-button';
  }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('userDetails') || '');
    this.user = this.userDetails.user;
    this.userId = this.jwtService.getUserId();
    this.getMyConnections()
    this.getFollowRequests();
    this.sortedPosts = this.allPosts.sort(
      (objA, objB) => new Date(objB.dateTimeOfPublishing).getTime() - new Date(objA.dateTimeOfPublishing).getTime(),
    );
    this.connectionService.getFollowRecommendations(this.userId).subscribe(data => {
      if (data != null) {
        data.forEach((element: string) => {
          this.profileService.getAboutInfo(element).subscribe(data1 => {
            this.recommendation.push({
              id: data1.id,
              firstName: data1.firstName,
              lastName: data1.lastName,
              gender: data1.gender,
              userName: data1.username,
              status:data1.status
            })
          })
        });
      }
    })
  }

  getPosts(id: any) {
    this.postService.getUserPosts(id).subscribe(data => {
      this.posts = data;
      console.log(this.posts)
      if (this.posts != null) {
        this.posts.forEach((value, i: any) => {
          if(value.image!=null && value.image!=""){
            value.image = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
            + value.image);
          }
          else{
            value.image=null;
          }
          value.showComments = false;
          value.newCommentText = '';
          this.profileService.getAboutInfo(id).subscribe(data => {
            value.userFirstName = data.firstName;
            value.userLastName = data.lastName;
            value.gender = data.gender;
          });
          this.getCommentUser(value);
        });
      }
    }, error => {
      alert('Error! Try again!')
    })
  }

  getCommentUser(post: any) {
    post.comments.forEach((value: any, i: any) => {
      this.profileService.getAboutInfo(value.userId).subscribe(data => {
        value.userFirstName = data.firstName;
        value.userLastName = data.lastName;
        value.gender = data.gender;
      })
    });
    this.allPosts.push(post)
  }

  getFollowRequests() {
    this.connectionService.getFollowRequests(this.user.id).subscribe(data => {
      this.requests = data;
      if (this.requests != null) {
        this.getFollowRequestUser();
      }

    }, error => {
      alert('Error!Try again!')
    })
  }

  getFollowRequestUser() {
    this.requests.forEach((value: any, i: any) => {
      this.profileService.getAboutInfo(value).subscribe(data => {
        this.followRequests.push({
          userId: value,
          userFirstName: data.firstName,
          userLastName: data.lastName,
          username: data.username,
          gender: data.gender,
        });
      })
    });
  }

  acceptFollowRequest(id: any) {
    let connection: Connection = {
      sourceId: id,
      targetId: this.user.id,
      connectionName: 'FOLLOWS'
    }
    this.connectionService.approveFollow(connection).subscribe(data => {
      alert('Successfully approved!');
      this.chatService.createChat(connection.sourceId, connection.targetId).subscribe(data => {
        window.location.reload()
      }, error => {
      })
      window.location.reload()
    }, error => {
      alert('Error!Try again!')
    });
  }

  rejectFollowRequest(id: any) {
    let connection: Connection = {
      sourceId: id,
      targetId: this.user.id,
      connectionName: 'FOLLOWS'
    }
    this.connectionService.rejectFollow(connection).subscribe(data => {
      alert('Successfully rejected!');
      this.chatService.createChat(connection.sourceId, connection.targetId).subscribe(data => {
        window.location.reload()
      }, error => {
      })
      window.location.reload()
    }, error => {
      alert('Error!Try again!')
    });
  }

  openAddDialog(event: { stopPropagation: () => void; }) {
    this.dilogRef = this.dialog.open(AddPostComponent, {
      data: {
      }
    });
  }

  getMyConnections() {
    this.connectionService.getConnections(this.user.id).subscribe(data => {
      if (data != null) {
        this.myConnections = data;
        this.myConnections.push(this.user.id);
        this.myConnections.forEach((value: { id: any; }, i: any) => {
          this.getPosts(value);
        });
      }
    })
  }

  addLike(post: any, index: any) {
    if (this.allPosts[index].dislikes.indexOf(this.user.id) !== -1) {
      this.removeDislike(post, index);
    }
    this.allPosts[index].likes.push(this.user.id);
    this.postService.addLikePost(this.user.id, post.id).subscribe((data: any) => {
      console.log(post.id)
    },
      error => {
        console.log(error.error.message);
      });
  }

  removeLike(post: any, index: any) {
    this.allPosts[index].likes.forEach((value: { id: any; }, i: any) => {
      if (value == this.user.id) {
        this.allPosts[index].likes.splice(i, 1);
      }
    });
    this.postService.removeLikePost(this.user.id, post.id).subscribe((data: any) => {
      console.log(post.id)
    },
      error => {
        console.log(error.error.message);
      });
  }

  isLiked(index: any): boolean {
    if (this.allPosts[index].likes == null)
      return false;
    if (this.allPosts[index].likes.indexOf(this.user.id) !== -1) {
      return true
    }
    return false
  }

  addDislike(post: any, index: any) {
    if (this.allPosts[index].likes.indexOf(this.user.id) !== -1) {
      this.removeLike(post, index);
    }
    this.allPosts[index].dislikes.push(this.user.id);
    this.postService.addDislikePost(this.user.id, post.id).subscribe((data: any) => {
      console.log(post.id)
    },
      error => {
        console.log(error.error.message);
      });

  }

  removeDislike(post: any, index: any) {
    this.allPosts[index].dislikes.forEach((value: { id: any; }, i: any) => {
      if (value == this.user.id) {
        this.allPosts[index].dislikes.splice(i, 1);
      }
    });
    this.postService.removeDislikePost(this.user.id, post.id).subscribe((data: any) => {
      console.log(post.id)
    },
      error => {
        console.log(error.error.message);
      });
  }

  isDisliked(index: any): boolean {
    if (this.allPosts[index].dislikes.indexOf(this.user.id) !== -1) {
      return true
    }
    return false
  }

  isCommented(index: any): boolean {
    if (this.allPosts[index].comments.userId.indexOf(this.user.id) !== -1) {
      return true
    }
    return false
  }

  showComments(index: any) {
    this.allPosts[index].showComments = !this.allPosts[index].showComments;
  }

  addComment(post: any, index: any) {
    this.newComment.postId = post.id;
    this.newComment.publisherId = this.user.id;
    this.newComment.text = this.allPosts[index].newCommentText;
    console.log(this.newComment);
    this.postService.addComment(this.newComment).subscribe(data => {
      let comment: any = this.newComment;
      comment.userFirstName = this.user.firstName;
      comment.userLastName = this.user.lastName;
      comment.gender = this.user.gender;
      this.allPosts[index].comments.push(comment);
      this.allPosts[index].newCommentText = '';
    }, error => {
      alert('Error!Try again!')
    })
  }

  connect(profileId: string) {
    let connection: Connection = {
      sourceId: this.userId,
      targetId: profileId,
      connectionName: ''
    }
    this.connectionService.followPublicUser(connection).subscribe(data => {
      alert('Successfully followed!');
      this.chatService.createChat(connection.sourceId, connection.targetId).subscribe(data => {
        window.location.reload()
      }, error => {
      })
    }, error => {
      alert('Error!Try again!')
    });
  }

  sendRequest(profileId: string) {
    let connection: Connection = {
      sourceId: profileId,
      targetId: this.userId,
      connectionName: ''
    }
    this.connectionService.sendRequest(connection).subscribe(data => {
      alert('Successfully send!');
      window.location.reload()
    }, error => {
      alert('Error!Try again!')
    })
  }
}
