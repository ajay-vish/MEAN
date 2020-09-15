import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatroomComponent } from 'src/app/components/user/chatroom/chatroom.component'

@Component({
  selector: 'app-display-profile',
  templateUrl: './display-profile.component.html',
  styleUrls: ['./display-profile.component.scss']
})
export class DisplayProfileComponent implements OnInit {

  currentUser: any;
  user: any;
  question: any;
  answer: any;
  id: any;
  isFollowing = false;
  faoRate: any;
  faoRated: boolean = false;
  isCurrentUser: boolean = false;
  isReported: boolean = false;
  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private main: MainService,
    private auth: AuthService,
    public datepipe: DatePipe,
    public dialog: MatDialog
  ) { }

  arrayOne(n: number): any[] {
    return Array(n);
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem("user"));
    this.title.setTitle("Profile");
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.auth.getProfileById(this.id).subscribe((data: any) => {
      this.user = data.user;
      console.log(this.user);
      console.log(this.currentUser.id);
      
      this.compareUser(this.user.followers, this.currentUser.id);
      this.isCurrent(this.user._id, this.currentUser.id);
      this.reported(this.user.reportedby, this.currentUser.id);
      this.user.birthdate =this.datepipe.transform(this.user.birthdate,'MMM d, y');
      this.question = data.question;
      this.answer = data.answer;
      this.faoRate = 3.6;
    });
  }

  isCurrent(user:any, currentUser:any) :void{
    if(user == currentUser){
      this.isCurrentUser = true;
    }else{
      this.isCurrentUser = false;
    }
  }
  
  onFaoRate(e) {
    this.faoRated = true;
    this.faoRate = e;
  }

  compareUser(followers: [], currentUser:any):void{
    for( let i=0; i < followers.length; i++){
      if(followers[i] == currentUser){
        this.isFollowing = true;
      }
    }
  }

  reported(users: [], currentUser:any): void{
    for(let i=0; i< users.length; i++){
      console.log(users[i])
      if(users[i] == currentUser){
        this.isReported = true;
      }
    }
  }
  
  like() {
    if(!this.isFollowing){
      this.isFollowing = !this.isFollowing;
      const body = {
        id: this.id,
        liked_id: this.currentUser.id,
        action: "u_like"
      }
      this.main.like(body).subscribe((data: any) => {
        console.log(data);
      });
    }else{
      this.isFollowing = !this.isFollowing;
      const body = {
        id: this.id,
        liked_id: this.currentUser.id,
        action: "u_dislike"
      }
      this.main.like(body).subscribe((data: any) => {
        console.log(data);
      });
    }
  }

  report(): void{
    if(this.isReported == false){
      const body = {
        id: this.currentUser.id,
        reported_id: this.id,
        action: "u_report"
      }
      console.log(body);
      this.main.report(body).subscribe((data: any) => {
        this.isReported = true; 
        console.log("Report");
      });
    }else{
      const body = {
        id: this.currentUser.id,
        reported_id: this.id,
        action: "u_withheld"
      }
      this.main.report(body).subscribe((data: any) => {
        this.isReported = false; 
        console.log("Withheld");
      });
    }
  }

  openDialog() {
    this.dialog.open(ChatroomComponent, {
      data: {
        id: this.user._id,
        username: this.user.username,
        name: this.user.name
      }
    });
  }
}
