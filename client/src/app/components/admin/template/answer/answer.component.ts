import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';

@Component({
  selector: 'answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

  constructor(
    private main: MainService
  ) { }

  answers: any;
  ngOnInit(): void {
    this.main.getAnswers().subscribe((data: any) => {
      this.answers = data;
    })
  }

}
