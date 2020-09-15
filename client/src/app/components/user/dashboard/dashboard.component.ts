import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  id: string;
  user: any;
  question: any;
  answer: any;
  like: number = 0;
  constructor(
    private title: Title,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Dashboard");
    this.id = JSON.parse(localStorage.getItem('user')).id;
    this.auth.getProfileById(this.id).subscribe((data: any) => {
      console.log(data);
      this.user = data.user;
      this.question = data.question;
      this.answer = data.answer;
      this.likeCalculator(this.question,this.answer);
    });
  }

  likeCalculator(question: any, answer: any) :void{
    for(let i=0; i< question.length; i++){
      this.like = this.like + question[i].likedby.length;
    }
    for(let i=0; i< answer.length; i++){
      this.like = this.like + answer[i].likedby.length;
    }
  }

}
