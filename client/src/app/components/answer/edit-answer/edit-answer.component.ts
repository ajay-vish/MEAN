import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'edit-answer',
  templateUrl: './edit-answer.component.html',
  styleUrls: ['./edit-answer.component.scss']
})
export class EditAnswerComponent implements OnInit {
  @Input() answer;
  constructor() { }

  ngOnInit(): void {
  }

}
