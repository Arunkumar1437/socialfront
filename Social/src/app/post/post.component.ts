import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  post = { text: '', image: null as File | null }; 
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private router: Router, private commonService: CommonService, private _snackBar: MatSnackBar,private formBuilder: FormBuilder )
    {}
  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.post.image = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  createPost() {
    const formData = new FormData();
    if (this.post.image) {
      formData.append('file', this.post.image, this.post.image.name);
    }
    this.commonService.createpost(formData).subscribe({ next: (res: any) => {
      if (res.sucess === true) {
        const message = 'Post Created successfully';
        this._snackBar.open(message, '', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',

        });
      }
    },
    error: (err: any) => {
      console.error('Error:', err);
      this._snackBar.open('An error occurred while create', '', {
        duration: 3000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
      });
    },
  });
}
}