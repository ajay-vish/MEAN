import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(
    private main: MainService
  ) { }
  
  url = "assets/images/ajay.jpg";
  users: any;
  ngOnInit(): void {
    this.main.getUsers().subscribe((data: any) => {
      this.users = data;
    })
  }

}
