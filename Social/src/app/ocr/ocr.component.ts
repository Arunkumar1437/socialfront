import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrl: './ocr.component.css'
})
export class OcrComponent {

  uploadedFile: File | null = null;
  extractedText: string = '';
  errorMessage: string | null = null;
  ocrForm: FormGroup;
  error:boolean=false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: CommonService,
    private formBuilder: FormBuilder,
  ) {
    this.ocrForm = this.formBuilder.group({
      fileUpload:[,Validators.required],
    });
  }

  validateAndUploadDocument(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;

    if (file && file.type === 'application/pdf') {
      this.errorMessage = null;
      this.uploadedFile = file;
    } else {
      this.error=true;
      this.errorMessage = 'Please upload a PDF file.....!';
      input.value = ''; 
    }
  }

  uploadFile(): void {
    if (!this.uploadedFile) {
      this.error=true;
      this.errorMessage = 'Please Choose The File.....!';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.uploadedFile);

    this.dataService.ocrupload(formData).subscribe(
      res => {
     //this.http.post<{ text: string }>(, formData).subscribe({
       //next: (response) => {
         this.extractedText = res.text;
         console.log('Extracted Text:', this.extractedText);
       
       error: (error: HttpErrorResponse) => {
         console.error('Upload error:', error);
         this.errorMessage = 'File upload failed. Please try again.';
       }
     });

    (document.getElementById('fileUpload') as HTMLInputElement).value = '';
  }

  cancelUpload(): void {
    this.router.navigate(['app/finance/transaction/digitallibrary1'], {
    });
  }
}
