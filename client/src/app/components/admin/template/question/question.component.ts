import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  constructor(
    private main: MainService
  ) { }

  questions: any;

  ngOnInit(): void {
    this.main.getQuestions().subscribe((data: any) => {
      this.questions = data;
    })
  }

}
