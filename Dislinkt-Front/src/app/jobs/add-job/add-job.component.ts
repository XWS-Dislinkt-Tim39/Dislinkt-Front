import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss']
})
export class AddJobComponent implements OnInit {
  form: FormGroup;
  constructor(  
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<AddJobComponent>) 
    { 
    this.form = this.formBuilder.group({
      text: [''],
      image: [''],
      link: ['']
    });
  }

  ngOnInit(): void {
  }

}
