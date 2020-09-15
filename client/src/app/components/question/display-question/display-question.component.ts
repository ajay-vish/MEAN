import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-display-question',
  templateUrl: './display-question.component.html',
  styleUrls: ['./display-question.component.scss',
  './../../user/dashboard/dashboard.component.scss']
})
export class DisplayQuestionComponent implements OnInit {

  id: any;
  question: any;
  answer: any;
  ques = [];
  constructor(
    private route: ActivatedRoute,
    private main: MainService,
    private title : Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle("QuestionDetails");
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    this.main.getQuestion(this.id)
    .subscribe((res: any) => {
      this.question = res;
      this.arrayPush(this.question);
      function answer(b, a) {
        return (a.vote.length - a.downvote.length) - (b.vote.length - b.downvote.length);
      }
      this.answer = res.answers.sort(answer);
    }, err => {
      console.log(err);
    });
  }

  arrayPush(data:any) :void {
    this.ques.push(data);
  }
}
