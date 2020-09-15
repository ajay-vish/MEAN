import { Component, OnInit, Inject } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { AuthService } from 'src/app/services/auth.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChatroomComponent } from 'src/app/components/user/chatroom/chatroom.component'

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private main: MainService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  currentUser = JSON.parse(localStorage.getItem('user'));
  user_id : any = [];
  users : any = []
  messages : any = []
  url = "assets/images/ajay.jpg";
  ngOnInit(): void {
    
    this.main.getChatRooms(this.currentUser.id).subscribe((data: any) => {
      this.getUserId(data);
      this.getMessages(data);
    });
    
  }


  getMessages(data: any){
    for(let i = 0; i< data.length; i++){
      this.messages[i] = data[i].messages[data[i].messages.length -1];
    }
  }

  getUserId(data:any) :void {
    for(let i = 0; i< data.length; i++){
      for(let j = 0; j< data[i].user.length; j++){
        if(data[i].user[j] != this.currentUser.id){
          this.user_id[i] = (data[i].user[j]);
        }
      }
    }
    this.getUsers(this.user_id);
  }

  getUsers(data: any) :void {
    for(let i = 0; i < data.length; i++){ 
      this.auth.getProfileById(data[i]).subscribe((user: any) =>{
        this.users[i] = user.user;
      });
    }
    console.log(this.users);
  }

  openDialog(id: String, username: String, name: String) {
    this.dialog.open(ChatroomComponent, {
      data: {
        id: id,
        username: username,
        name: name
      }
    });
  }

}
