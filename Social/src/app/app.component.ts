import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { Router } from '@angular/router';
import { AppModule } from "./app.module";


@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [CommonModule, RouterOutlet, AppModule]
})
export class AppComponent {
  themeblack:boolean=false;
  themewhite:boolean=false;

  ngOnInit(): void {
    const theme = localStorage.getItem('theme');
    if(theme==='light'){
      this.themewhite=true;
    }else if(theme==='dark'){
      this.themeblack=true;
    }else{
      
    }
  }
  constructor(private router: Router){}
    isLoginPage(): boolean {
      return (
        this.router.url.startsWith('/Login/login') || this.router.url === '/Register/register' ||  this.router.url === '/Forget/forget' ||
        /^\/View\/view\/\d+$/.test(this.router.url) ||  /^\/Login\/login(\/\d+)?$/.test(this.router.url)
      );
    }
    
}

