import { Component, OnInit, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { WebsocketService } from 'src/app/services/websocket.service';
import {MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private webSocket: WebsocketService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) { }
  url = "assets/images/ajay.jpg";
  isSend: any = [false];
  users: any = [];
  currentUser = JSON.parse(localStorage.getItem('user'));
  chatroom: any;
  message: String = '';

  ngOnInit(): void {
    this.auth.getProfileById(this.currentUser.id).subscribe((data: any) => {
      const followers = data.user.following;
      for(let i=0; i < followers.length; i++){
        this.auth.getProfileById(followers[i]).subscribe((data: any) => {
          this.users[i] = data.user;
        });
      }
    });
  }

  onClick(i): void {
    let text= navigator.clipboard.readText();
    console.log(text);
    this.isSend[i] = true
  }

  sendMessage(user : any, i: any) {
    if ( this.currentUser.username < user.username) {
      this.chatroom = this.currentUser.username.concat(user.username);
    } else {
      this.chatroom = user.username.concat(this.currentUser.username);
    }
    this.webSocket.joinRoom({user: [this.currentUser.id, user._id], room: this.chatroom});
    let currentTime = new Date();
    this.isSend[i] = true
    this.webSocket.sendMessage({room: this.chatroom, user: this.currentUser.username, message: this.data, created_at: currentTime});
  }
}
