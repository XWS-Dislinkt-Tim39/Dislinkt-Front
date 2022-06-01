import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NewPost } from 'src/app/core/models/new-post.model';
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
    dateTimeOfPublishing: new Date()
  }
  userId: any;
  constructor(private formBuilder: FormBuilder,
    private jwtService: JwtService,
    private postService:PostService,
    private dialogRef: MatDialogRef<AddPostComponent>,
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
  ngOnInit(): void {
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
    this.newPost.userId=this.userId;
    if(this.showText){
      this.newPost.text=this.form.value.text;
    }
    this.newPost.dateTimeOfPublishing=new Date();
    console.log(this.newPost)
    this.postService.addNewPost(this.newPost).subscribe(data=>{
      alert('Sucessfully added new post');
      window.location.reload();
    },error=>{
      alert('Error! Try again!')
    })
  }
  fileChangeEvent(fileInput: any) {

    if (fileInput.target.files && fileInput.target.files[0]) {


      this.myfilename = '';
      Array.from(fileInput.target.files).forEach((file: any) => {
        console.log(file);
        this.myfilename += file.name + ',';
      });

      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {

          // Return Base64 Data URL
          const imgBase64Path = e.target.result;

        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);

      // Reset File Input to Selct Same file again
      this.uploadFileInput!.nativeElement.value = "";
    } else {
      this.myfilename = 'Select File';
    }
  }
}

