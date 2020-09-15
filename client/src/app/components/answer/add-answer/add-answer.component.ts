import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MainService } from 'src/app/services/main.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: [
    './add-answer.component.scss',
    './../../user/dashboard/dashboard.component.scss'
  ]
})
export class AddAnswerComponent implements OnInit {

  answer: String;
  id: String;
  
  questionid = this.route.snapshot.paramMap.get('id');
  question: any;

  user = localStorage.getItem('user');
  userdata = JSON.parse(this.user);
  userid = this.userdata.id;
  username = this.userdata.name;
  
  constructor(
    private route: ActivatedRoute,
    private mainService: MainService,
    public router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
    });
    console.log(this.username);
    this.mainService.getQuestion(this.questionid)
    .subscribe((res: any) => {
      this.question = res;
    }, err => {
      console.log(err);
    });
  }

  onAddAnswer() {
    const answer = {
      question: this.questionid,
      answer: this.answer,
      user: this.userid,
      username: this.username
    };

    this.mainService.addAnswer(answer).subscribe((data: any) => {
      if (data.success) {
        this._snackBar.open("Answer added", "OK", {
          duration: 2000,
        });
        this.router.navigate(["question/"+this.id]);
      } else {
        console.log("Error");
      }
    });
  }

}
