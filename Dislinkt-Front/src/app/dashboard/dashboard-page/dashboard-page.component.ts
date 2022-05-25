import { AddPostComponent } from './../add-post/add-post.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  dilogRef: any;
  isLike:boolean=false;
  isDislike:boolean=false;
  isComment:boolean=false;
  likeStyle:string='';
  dislikeStyle:string='';
  commentStyle:string='';
  constructor(public dialog: MatDialog) {
    this. likeStyle = 'reaction-button';
    this. dislikeStyle = 'reaction-button';
    this. commentStyle = 'reaction-button';
   }

  ngOnInit(): void {
  }

  openAddDialog(event: { stopPropagation: () => void; }) {
    this.dilogRef = this.dialog.open(AddPostComponent, {
      data: {
      }
    });
  }
  toggleLike(){
    this.isLike=!this.isLike;
    if(this.isLike){
      this.likeStyle='like-button';
    }
    else{
      this.likeStyle = 'reaction-button';
    }
  }
  toggleDislike(){
    this.isDislike=!this.isDislike;
    if(this.isDislike){
      this.dislikeStyle='dislike-button';
    }
    else{
      this.dislikeStyle = 'reaction-button';
    }
  }
  toggleComment(){
    this.isComment=!this.isComment;
    if(this.isComment){
      this.commentStyle='comment-button';
    }
    else{
      this.commentStyle = 'reaction-button';
    }
  }

}
