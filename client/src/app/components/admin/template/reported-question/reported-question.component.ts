import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'app-reported-question',
  templateUrl: './reported-question.component.html',
  styleUrls: ['./reported-question.component.scss']
})
export class ReportedQuestionComponent implements OnInit {

  constructor(
    private main: MainService
  ) { }

  questions: any = [];
  answers: any = [];
  users: any = [];
  ngOnInit(): void {
    this.main.getReported().subscribe((data: any) => {
      this.reportedAnswers(data.answer);
      this.reportedQuestions(data.question);
      this.reportedUsers(data.user);
    });
  }

  reportedAnswers(data: any){
    let count = 0;
    for(let i=0; i< data.length; i++){
      if(data[i].reportedby.length){
        this.answers[count] = data[i];
        count = count + 1;
      }
    }
    console.log(this.answers);

  }

  reportedQuestions(data: any){
    let count = 0;
    for(let i=0; i< data.length; i++){
      if(data[i].reportedby.length){
        this.questions[count] = data[i];
        count = count + 1;
      }
    }
    console.log(this.questions);

  }

  reportedUsers(data: any){
    let count = 0;
    for(let i=0; i< data.length; i++){
      if(data[i].reportedby.length){
        this.users[count] = data[i];
        count = count + 1;
      }
    }
    console.log(this.users);

  }

}
