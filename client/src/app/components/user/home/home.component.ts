import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  url = "assets/images/ajay.jpg";
  currentUser = JSON.parse(localStorage.getItem('user'));
  
  constructor() { }

  ngOnInit(): void {
  }

}
