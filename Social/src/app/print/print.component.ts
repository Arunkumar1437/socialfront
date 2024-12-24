import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../common.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent {
  id: any;
  printdata:any[]=[] ;
  firstItem: any;
  constructor(
    private route: ActivatedRoute, private app: CommonService,
  ){}
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      this.loaddata();
    });
  }

  loaddata() {
      this.app.edit(this.id).subscribe({
        next: (data: any) => {
          this.printdata = data.editlist;

          if (this.printdata.length > 0) {
            this. firstItem = this.printdata[0];
            console.log(this.firstItem)
          } else {
            console.error('No data found for ID: ', this.id);
          }
        },
        error: (e: any) => {
          console.error('Error loading data:', e);
        }
      });
    }
    printPDF(): void {
    window.print();
  }

}

