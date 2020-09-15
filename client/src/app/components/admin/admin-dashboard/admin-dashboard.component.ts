import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { MainService } from 'src/app/services/main.service';
import { AnswerComponent } from '../template/answer/answer.component';
import { QuestionComponent } from '../template/question/question.component';
import { ReportedQuestionComponent } from '../template/reported-question/reported-question.component';
import { UserComponent } from '../template/user/user.component';
 
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private main: MainService,
    private auth: AuthService
  ) { }

  actions: any[] = [{value: 'Enabled'}, {value: 'Disable'}];
  selectedAction: any = 'Enabled';
  isHidden : any = [];
  admin_action_comment: String;
  questions: any = [];
  answers: any = [];
  users: any = [];
  reportedQuestion: any = [];
  reportedAnswer: any = [];
  reportedUser: any = [];
  url = "assets/images/ajay.jpg";

  ngOnInit(): void {
    this.main.getReported().subscribe((data: any) => {
      console.log(data);
      this.users = data.user;
      this.answers = data.answer;
      this.questions = data.question;
      this.reportedAnswers(data.answer);
      this.reportedQuestions(data.question);
      this.reportedUsers(data.user);
    });
  }

  updateUser(id:String, i:number):void {
    const body = {
      id: id,
      admin_action: this.selectedAction,
      admin_action_comment: this.admin_action_comment
    }
    this.auth.updateProfile(body, id).subscribe((data: any) => {
      if(data){
        this.reportedUser[i] = data;
        console.log("updated");
        this.isHidden[i] = false;
      }else {
        console.log("Error!")
      }
    });
  }

  updateQuestion(id:String, i:number):void {
    const body = {
      _id: id,
      admin_action: this.selectedAction,
      admin_action_comment: this.admin_action_comment
    }
    this.main.updateQuestion(body).subscribe((data: any) => {
      if(data){
        console.log(data);
        this.reportedQuestion[i] = data.question;
        console.log("updated");
        this.isHidden[i] = false;
      }else {
        console.log("Error!")
      }
    });
  }

  updateAnswer(id:String, i:number):void {
    const body = {
      _id: id,
      admin_action: this.selectedAction,
      admin_action_comment: this.admin_action_comment
    }
    this.main.updateAnswer(body).subscribe((data: any) => {
      if(data){
        console.log(data);
        this.reportedAnswer[i].admin_action = this.selectedAction;
        this.reportedAnswer[i].admin_action_comment = this.admin_action_comment;
        console.log("updated");
        this.isHidden[i] = false;
      }else {
        console.log("Error!")
      }
    });
  }

  unhide(i){
    this.selectedAction = this.reportedUser[i].admin_action;
    this.admin_action_comment = this.reportedUser[i].admin_action_comment;
    this.isHidden[i] = true;
  }

  unhideQuestion(i){
    this.selectedAction = this.reportedQuestion[i].admin_action;
    this.admin_action_comment = this.reportedQuestion[i].admin_action_comment;
    this.isHidden[i] = true;
  }

  unhideAnswer(i){
    this.selectedAction = this.reportedAnswer[i].admin_action;
    this.admin_action_comment = this.reportedAnswer[i].admin_action_comment;
    this.isHidden[i] = true;
  }

  hide(i){
    this.isHidden[i] = false;
  }

  reportedAnswers(data: any){
    let count = 0;
    for(let i=0; i< data.length; i++){
      if(data[i].reportedby.length){
        this.reportedAnswer[count] = data[i];
        count = count + 1;
      }
    }
  }

  reportedQuestions(data: any){
    let count = 0;
    for(let i=0; i< data.length; i++){
      if(data[i].reportedby.length){
        this.reportedQuestion[count] = data[i];
        count = count + 1;
      }
    }
  }

  reportedUsers(data: any){
    let count = 0;
    for(let i=0; i< data.length; i++){
      if(data[i].reportedby.length){
        this.reportedUser[count] = data[i];
        count = count + 1;
      }
    }
  }

  onOpenQuestion() {
    this.dialog.open( QuestionComponent);
  }

  onOpenAnswer() {
    this.dialog.open( AnswerComponent);
  }

  onOpenUser() {
    this.dialog.open( UserComponent);
  }

  onOpenReportedQuestion() {
    this.dialog.open( ReportedQuestionComponent);
  }
}