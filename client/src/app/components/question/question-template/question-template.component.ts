import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MainService } from 'src/app/services/main.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FollowersComponent } from '../../user/templates/followers/followers.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-question-template',
  templateUrl: './question-template.component.html',
  styleUrls: ['./question-template.component.scss']
})
export class QuestionTemplateComponent implements OnInit {

  @Input() question
  user: any;
  bntStyle = 'btn-default';
  likedusers: any;
  isLiked: boolean = false;
  isReported: boolean = false;
  isWatching: boolean = false;
  isHidden: boolean;
  isCurrentUser: boolean;
  currentUser: any = JSON.parse(localStorage.getItem("user"));
  url = "assets/images/ajay.jpg";
  currentTime = new Date();
  constructor(
    public datepipe: DatePipe,
    private main: MainService,
    private _snackBar: MatSnackBar,
    public router: Router,
    private _bottomSheet: MatBottomSheet
  ) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user"));
    this.liked(this.question.likedby);
    this.reported(this.question.reportedby);
    this.watching(this.question.watching);
    if(this.question.user._id == this.currentUser.id){
      this.isCurrentUser = true;
    }else{
      this.isCurrentUser = false;
    }
    if(this.isLiked){
      this.bntStyle = 'btn-change';
    }else{
      this.bntStyle = 'btn-default';
    }
    this.question.created_at =this.datepipe.transform(this.question.created_at,'MMM d, y h:mm a');
  }

  updateQuestion(){
    
    const question = {
      _id: this.question._id,
      question: this.question.question,
      description: this.question.description
    }
    console.log(question)
    this.main.updateQuestion(question).subscribe((data: any) => {
      this.isHidden = false;
      this.question = data.question;
    });
  }

  editQuestion(){
    this.isHidden = true;
  }

  closeQuestion(){
    this.isHidden = false;
  }

  openBottomSheet(data: any): void {
    this._bottomSheet.open(FollowersComponent, {
      data: data,
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    moveItemInArray(this.question.tags, event.previousIndex, event.currentIndex);
  }

  liked(users: []): void{
    for(let i=0; i< users.length;i++){
      if(users[i]==this.user.id){
        this.isLiked = true;
      }
    }
  }

  reported(users: []): void{
    for(let i=0; i< users.length;i++){
      if(users[i]==this.user.id){
        this.isReported = true;
      }
    }
  }

  watching(users: []): void{
    for(let i=0; i< users.length;i++){
      if(users[i]==this.user.id){
        this.isWatching = true;
      }
    }
  }

  report(id: string): void{
    if(this.isReported == false){
      const body = {
        id: this.user.id,
        reported_id: id,
        action: "q_report"
      }
      this.main.report(body).subscribe((data: any) => {
        this.isReported = true; 
        console.log("Report");
      });
    }else{
      const body = {
        id: this.user.id,
        reported_id: id,
        action: "q_withheld"
      }
      this.main.report(body).subscribe((data: any) => {
        this.isReported = false; 
        console.log("Withheld");
      });
    }
  }

  like(id: string): void{
    if(this.isLiked == false){
      this.bntStyle = 'btn-change';
      this.isLiked = true;
      const body = {
        id: this.user.id,
        liked_id: id,
        action: "q_like"
      }
      this.main.like(body).subscribe((data: any) => {
        console.log("Liked");
      });
    }else{
      this.bntStyle = 'btn-default';
      this.isLiked = false;
      const body = {
        id: this.user.id,
        liked_id: id,
        action: "q_dislike"
      }
      this.main.like(body).subscribe((data: any) => {
        console.log("Disliked");
      });
    }
  }
  
  watch(id: String) :void{
    if(!this.isWatching){
      const body = {
        user_id:this.user.id,
        question_id: id,
        action: 'start'
      }
      this.main.watch(body).subscribe((data: any) => {
        console.log(data);
        this.isWatching = true;
      });
    }else{
      const body = {
        user_id:this.user.id,
        question_id: id,
        action: 'stop'
      }
      this.main.watch(body).subscribe((data: any) => {
        console.log(data);
        this.isWatching = false;
      });
    }
    
  }

  copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this._snackBar.open("Question link copied" , "OK", {
      duration: 2000,
    });
  }

}
