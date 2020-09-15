import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { map, shareReplay } from "rxjs/operators";
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AuthService } from 'src/app/services/auth.service';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessagesComponent } from 'src/app/components/user/templates/messages/messages.component';
import { NotificationsComponent } from 'src/app/components/user/templates/notifications/notifications.component';

MessagesComponent
@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService : AuthService,
    private main : MainService,
    public router: Router,
    public dialog: MatDialog
    ) {}

  currentUser = JSON.parse(localStorage.getItem("user"));
  user: any;
  notifications: any;
  message: any;
  notification_count: any;
  
  ngOnInit(): void {
    this.authService.getProfileById(this.currentUser.id).subscribe((data: any) => {
      this.user = data;
    });
    this.main.getNotification(this.currentUser.id).subscribe((data: any) => {
      let temp = data.notification;
      function comp(b, a) {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      this.notifications = temp.sort(comp);

      let count = 0;
      for(let i = 0; i < this.notifications.length; i++){
        if(this.notifications[i].isRead == false){
          count++;
        }
      }
      this.notification_count = count;


    });
    this.main.getChatRooms(this.currentUser.id).subscribe((data: any) => {
      let count = 0;
      for(let i = 0; i < data.length; i++){
        if(data[i].messages[data[i].messages.length-1].user != this.currentUser.username){
          count++;
        }
      }
      this.message = count;
    })
  }

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    
  show($event) {
    console.log($event);
  }

  onLogOut(){
    this.authService.logout();
  }

  onOpenDialogue() {
    this.dialog.open( MessagesComponent , {
      data: {
        id: this.user._id,
        username: this.user.username
      }
    });
  }
  
  onOpenNotification() {
    this.dialog.open( NotificationsComponent , {
      data: {
        notifications: this.notifications
      }
    });
  }

}
