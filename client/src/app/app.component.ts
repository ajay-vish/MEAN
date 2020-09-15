import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  myVar = true;
  currentUser = JSON.parse(localStorage.getItem('user'));
  currentAdmin = JSON.parse(localStorage.getItem('admin'));
  constructor(
    public location: Location,
    public router: Router
    ){
      router.events.subscribe((val) => {
        if(this.location.path() === '/login'){
          this.myVar = true;
          this.currentUser = JSON.parse(localStorage.getItem('user'));
          this.currentAdmin = JSON.parse(localStorage.getItem('admin'));
        }else{
          this.myVar = false;
          this.currentUser = JSON.parse(localStorage.getItem('user'));
          this.currentAdmin = JSON.parse(localStorage.getItem('admin'));
        }
     });
    }

    ngOnInit(): void {
    }
}
