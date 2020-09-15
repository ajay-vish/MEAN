import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public main: MainService
  ) { }

  notifications =  this.data.notifications;
  ngOnInit(): void {
  }

  onReadNotification(id: String) :void{
    this.main.notificationRead(id).subscribe((data: any) => {
      console.log(data);
    });
  }

}
