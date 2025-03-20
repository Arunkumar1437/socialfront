import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonService } from '../common.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrl: './ocr.component.css'
})
export class OcrComponent {

  fileUploadinvoice: File | null = null;
  fileUploadpo: File | null = null;
  invoiceDetail:any[]=[];
  poDetail:any[]=[];
  comparedList:any[]=[];
  detailTable:any[]=[];
  aggreDetail:any[]=[];
  poerrorMessage: string | null = null;
  invoiceerrorMessage: string | null = null;
  ocrForm: FormGroup;
  invoiceerror:boolean=false;
  poerror:boolean=false;
  comparelist:boolean=false;
  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private dataService: CommonService,
    private formBuilder: FormBuilder,
     private _snackBar: MatSnackBar
  ) {
    this.ocrForm = this.formBuilder.group({
      fileUploadinvoice:[,Validators.required],
      fileUploadpo:[,Validators.required],
    });
  }

  validateAndUploadDocument(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;

    if (file && file.type === 'application/pdf') {
      this.invoiceerrorMessage = null;
      this.fileUploadinvoice = file;
    } else {
      this.invoiceerror=true;
      this.invoiceerrorMessage = 'Please upload a PDF file.....!';
      input.value = ''; 
    }
  }

  validateAndUploadDocument1(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0] || null;

    if (file && file.type === 'application/pdf') {
      this.poerrorMessage = null;
      this.fileUploadpo = file;
    } else {
      this.poerror=true;
      this.poerrorMessage = 'Please upload a PDF file.....!';
      input.value = ''; 
    }
  }

  uploadinvoice(): void {
    if (!this.fileUploadinvoice) {
      this.invoiceerror=true;
      this.invoiceerrorMessage = 'Please Choose The File.....!';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.fileUploadinvoice);

    this.dataService.ocruploadinvoice(formData).subscribe(
      res => {
        if(res.success){
          this.invoiceDetail = res.detailTable;
          this.ocrForm.get('fileUploadinvoice')?.setValue(null);
          console.log('Invoice List'+this.invoiceDetail)
          this._snackBar.open('Invoice Upload Sucess', '', {
            duration: 300,
            verticalPosition: 'top',horizontalPosition: 'right',
            panelClass: ['success-snackbar']
          });
        }
       error: (error: HttpErrorResponse) => {
         console.error('Upload error:', error);
         this.invoiceerrorMessage = 'File upload failed. Please try again.';
       }
     });

  }

   uploadpo(): void {
    if (!this.fileUploadpo) {
      this.poerror=true;
      this.poerrorMessage = 'Please Choose The File.....!';
      return;
    }

    const formData = new FormData();
    formData.append('file', this.fileUploadpo);

    this.dataService.ocruploadpo(formData).subscribe(
      res => {
        if(res.success){
        this.poDetail = res.aggreDetail;
        this.ocrForm.get('fileUploadpo')?.setValue(null);
        console.log('Po List'+this.poDetail)
        this._snackBar.open('Po Upload Sucess', '', {
          duration: 300,
          verticalPosition: 'top',horizontalPosition: 'right',
          panelClass: ['success-snackbar']
        });
        
        }
         error: (error: HttpErrorResponse) => {
         console.error('Upload error:', error);
         this.poerrorMessage = 'File upload failed. Please try again.';
       }
     });

  }
  compare():void{
    this.detailTable=this.invoiceDetail;
    this.aggreDetail=this.poDetail;
    this.dataService.ocruploadcompare(this.detailTable,this.aggreDetail).subscribe(
      res => {
       this.comparedList=res.compareData
       this.comparelist=true
       console.log('Compared List'+this.comparedList)
         error: (error: HttpErrorResponse) => {
       }
     });
  }
  cancelUpload(): void {
    this.router.navigate(['app/finance/transaction/digitallibrary1'], {
    });
  }
}
