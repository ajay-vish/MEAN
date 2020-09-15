import { Component, OnInit, Inject, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WebsocketService } from 'src/app/services/websocket.service';
import { MainService } from 'src/app/services/main.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit, AfterViewChecked  {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  url = "assets/images/ajay.jpg";
  hideme: any = {};
  username: String;
  email: String;
  chatroom;
  message: String = '';
  messageArray: Array<{user: String, message: String, created_at: String}> = [];
  isTyping = false;
  currentUser = JSON.parse(localStorage.getItem('user'));

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,
    private webSocket: WebsocketService,
    private router: Router,
    private main: MainService
  ) {
    this.webSocket.newMessageReceived().subscribe(data => {
      this.messageArray.push(data);
      this.isTyping = false;
    });
    this.webSocket.receivedTyping().subscribe(bool => {
      this.isTyping = bool.isTyping;
    });
   }

  ngOnInit(): void {
    this.username = this.data.username;
    if ( this.currentUser.username < this.username) {
      this.chatroom = this.currentUser.username.concat(this.username);
    } else {
      this.chatroom = this.username.concat(this.currentUser.username);
    }
    this.webSocket.joinRoom({user: [this.currentUser.id, this.data.id], room: this.chatroom});
    this.main.getChatRoomsChat(this.chatroom)
    .subscribe((messages: any) => {
      this.messageArray = messages;
    }, err => {
      console.log(err);
    });
  }
  ngAfterViewChecked() {        
    this.scrollToBottom();        
  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  sendMessage() {
    let currentTime = new Date();
    this.webSocket.sendMessage({room: this.chatroom, user: this.currentUser.username, message: this.message, created_at: currentTime});
    this.message = '';
  }

  typing() {
    this.webSocket.typing({room: this.chatroom, user: this.currentUser.username});
  }

  onClick(i) {
    Object.keys(this.hideme).forEach(h => {
      this.hideme[h] = false;
    });
    this.hideme[i] = true;
  }

}
