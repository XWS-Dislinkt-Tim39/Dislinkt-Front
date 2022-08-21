import { ConditionalExpr } from '@angular/compiler';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NewPost } from 'src/app/core/models/new-post.model';
import { ConnectionService } from 'src/app/core/services/connection.service';
import { JwtService } from 'src/app/core/services/jwt.service';
import { PostService } from 'src/app/core/services/post.service';

declare var $: any;
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  form: FormGroup;
  @ViewChild('UploadFileInput') uploadFileInput: ElementRef | undefined;
  myfilename = 'Select File';
  showText: boolean = false;
  showImage: boolean = false;
  showLink: boolean = false;
  textStyle: string = '';
  imageStyle: string = '';
  imageDropifyStyle: string = '';
  newPost: NewPost = {
    userId: '',
    text: '',
    dateTimeOfPublishing: new Date(),
    followersId: []
  }
  fileName: any;
  connections: any[] = [];
  userId: any;
  constructor(private formBuilder: FormBuilder,
    private jwtService: JwtService,
    private postService: PostService,
    private dialogRef: MatDialogRef<AddPostComponent>,
    private connectionService: ConnectionService
  ) {
    this.userId = this.jwtService.getUserId();
    this.textStyle = 'text-default';
    this.imageStyle = 'text-default';
    this.imageDropifyStyle = 'image-default';
    this.form = this.formBuilder.group({
      text: [''],
      image: [''],
    });
  }
  imageSrc: any;
  imageData: any;

  ngOnInit(): void {
    this.getMyConnections();
    $(() => {
      $('.dropify').dropify();
    });
  }

  get buttons(): { [key: string]: AbstractControl; } { return this.form.controls; }

  logoUpdate(event: any): void {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.imageSrc = reader.result;
    reader.readAsDataURL(file);
  }

  toggleText() {
    this.showText = !this.showText;
    if (this.showText) {
      this.textStyle = 'text-checked';
    }
    else {
      this.textStyle = 'text-default';
    }
  }

  getMyConnections() {
    this.connectionService.getConnections(this.userId).subscribe(data => {
      if (data != null) {
        this.connections = data;
      }
    })
  }

  toggleImage() {
    this.showImage = !this.showImage;
    if (this.showImage) {
      this.imageDropifyStyle = 'image-checked';
    }
    else {
      this.imageDropifyStyle = 'image-default';
    }
    if (this.showImage) {
      this.imageStyle = 'text-checked';
    }
    else {
      this.imageStyle = 'text-default';
    }
  }

  addPost() {
    this.newPost.userId = this.userId;
    if (this.showText) {
      this.newPost.text = this.form.value.text;
    }
    this.newPost.dateTimeOfPublishing = new Date();
    this.newPost.followersId = this.connections;
    // this.newPost.image=this.imageData!;
    this.postService.addNewPost(this.newPost).subscribe(data => {
      alert('Sucessfully added new post');
      console.log(data)
      this.addImage(data.id);
      //window.location.reload();
    }, error => {
      alert('Error! Try again!')
    })
  }


  onFileSelected(event: any) {

    const file: File = event.target.files[0];
    console.log(file);

    if (file) {

      this.fileName = file.name;
      console.log(this.fileName);
      const formData = new FormData();
      formData.append("image", file, file.name);
      this.imageData = formData;
    }
  }

  addImage(postId:number){
    console.log('ss')
   this.postService.saveImage(this.imageData,postId).subscribe(data=>{
    alert('uhuu')
   })
  }



}
