import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
  showText:boolean=false;
  showImage:boolean=false;
  showLink:boolean=false;
  textStyle:string='';
  imageStyle:string='';
  linkStyle:string='';
  imageDropifyStyle:string='';
  constructor(private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddPostComponent>,
  ) {
    this. textStyle = 'text-default';
    this. imageStyle = 'text-default';
    this. linkStyle = 'text-default';
    this. imageDropifyStyle = 'image-default';
    this.form = this.formBuilder.group({
      text: [''],
      image: [''],
      link: ['']
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

  toggleText(){
    this.showText=!this.showText;
    if(this.showText){
      this.textStyle='text-checked';
    }
    else{
      this.textStyle = 'text-default';
    }
    
  }
  toggleImage(){
    this.showImage=!this.showImage;
    if(this.showImage){
      this.imageDropifyStyle='image-checked';
    }
    else{
      this.imageDropifyStyle ='image-default';
    }
    if(this.showImage){
      this.imageStyle='text-checked';
    }
    else{
      this.imageStyle ='text-default';
    }
  }
  toggleLink(){
    this.showLink=!this.showLink;
    if(this.showLink){
      this.linkStyle='text-checked';
    }
    else{
      this.linkStyle = 'text-default';
    }
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

