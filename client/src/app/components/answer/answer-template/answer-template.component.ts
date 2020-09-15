import { Component, OnInit, Input } from '@angular/core';
import { DatePipe } from '@angular/common';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-answer-template',
  templateUrl: './answer-template.component.html',
  styleUrls: ['./answer-template.component.scss']
})
export class AnswerTemplateComponent implements OnInit {

  @Input() answer
  isLiked: boolean = false;
  isReported: boolean = false;
  currentUser: any = JSON.parse(localStorage.getItem("user"));
  bntStyle = 'btn-default';
  isDownvote = false;
  isUpvote = false;
  count: number;
  isHidden: boolean;
  isCurrentUser: boolean;
  constructor(
    public datepipe: DatePipe,
    public main: MainService,
    public router: Router,
    public _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.answer.created_at =this.datepipe.transform(this.answer.created_at,'MMM d, y, h:mm:ss a');
    this.liked(this.answer.likedby, this.currentUser.id);
    this.reported(this.answer.reportedby, this.currentUser.id);
    this.vote(this.answer.vote,this.answer.downvote , this.currentUser.id);
    this.count = this.answer.vote.length - this.answer.downvote.length;
    if(this.answer.user == this.currentUser.id){
      this.isCurrentUser = true;
    }else{
      this.isCurrentUser = false;
    }
    if(this.isLiked){
      this.bntStyle = 'btn-change';
    }else{
      this.bntStyle = 'btn-default';
    }
  }

  updateAnswer(){
    const answer = {
      _id: this.answer._id,
      answer: this.answer.answer
    }
    this.main.updateAnswer(answer).subscribe((data: any) => {
      this.isHidden = false;
      this.answer = data.answer;
    });
  }

  editAnswer(){
    this.isHidden = true;
  }

  closeAnswer(){
    this.isHidden = false;
  }

  vote(upvote: [], downvote: [], user){
    for(let i = 0; i < upvote.length; i++){
      if(upvote[i] == user){
        this.isUpvote = true;
      }
    }
    for(let i = 0; i < downvote.length; i++){
      if(downvote[i] == user){
        this.isDownvote = true;
      }
    }
  }

  upvote() {
    if(!this.isUpvote) {
      const body = {
        id: this.answer._id,
        user: this.currentUser.id,
        action: "upvote"
      }
      this.main.voteAnswer(body).subscribe((data: any) => {
        this.isUpvote = true;
        this.count = this.count + 1;
        console.log(body.action);
      });
    }
    if(this.isUpvote) {
      const body = {
        id: this.answer._id,
        user: this.currentUser.id,
        action: "pull_upvote"
      }
      this.main.voteAnswer(body).subscribe((data: any) => {
        this.isUpvote = false;
        this.count = this.count - 1;
        console.log(body.action);
      });
    }
    if(this.isDownvote) {
      const body = {
        id: this.answer._id,
        user: this.currentUser.id,
        action: "pull_downvote"
      }
      this.main.voteAnswer(body).subscribe((data: any) => {
        this.isDownvote = false;
        this.count = this.count + 1;
        console.log(body.action);
      });
    }
  }

  downvote() {
    if(!this.isDownvote) {
      const body = {
        id: this.answer._id,
        user: this.currentUser.id,
        action: "downvote"
      }
      this.main.voteAnswer(body).subscribe((data: any) => {
        this.isDownvote = true;
        this.count = this.count - 1;
        console.log(body.action);
      });
    }
    if(this.isDownvote) {
      const body = {
        id: this.answer._id,
        user: this.currentUser.id,
        action: "pull_downvote"
      }
      this.main.voteAnswer(body).subscribe((data: any) => {
        this.isDownvote = false;
        this.count = this.count + 1;
        console.log(body.action);
      });
    }
    if(this.isUpvote) {
      const body = {
        id: this.answer._id,
        user: this.currentUser.id,
        action: "pull_upvote"
      }
      this.main.voteAnswer(body).subscribe((data: any) => {
        this.isUpvote = false;
        this.count = this.count - 1;
        console.log(body.action);
      });
    }
  }

  liked(like: [], currentUser:any):void{
    for( let i=0; i < like.length; i++){
      if(like[i] == currentUser){
        this.isLiked = true;
      }
    }
  }

  reported(users: [], currentUser:any): void{
    for(let i=0; i< users.length; i++){
      if(users[i] == currentUser){
        this.isReported = true;
      }
    }
  }
  
  like() {
    if(!this.isLiked){
      const body = {
        id: this.currentUser.id,
        liked_id: this.answer._id,
        action: "a_like"
      }
      this.main.like(body).subscribe((data: any) => {
        console.log("Answer disliked");
        this.bntStyle = 'btn-change';
        this.isLiked = true;
      });
    }else{
      const body = {
        id: this.currentUser.id,
        liked_id: this.answer._id,
        action: "a_dislike"
      }
      this.main.like(body).subscribe((data: any) => {
        console.log("Answer disliked");
        this.bntStyle = 'btn-default';
        this.isLiked = false;
      });
    }
  }

  report(): void{
    if(this.isReported == false){
      const body = {
        id: this.currentUser.id,
        reported_id: this.answer._id,
        action: "a_report"
      }
      this.main.report(body).subscribe((data: any) => {
        this.isReported = true; 
        console.log("Report");
      });
    }else{
      const body = {
        id: this.currentUser.id,
        reported_id: this.answer._id,
        action: "a_withheld"
      }
      this.main.report(body).subscribe((data: any) => {
        this.isReported = false; 
        console.log("Withheld");
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
    this._snackBar.open("Answer has been copied" , "OK", {
      duration: 2000,
    });
  }

}
