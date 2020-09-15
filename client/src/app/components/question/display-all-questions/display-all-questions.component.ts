import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-display-all-questions',
  templateUrl: './display-all-questions.component.html',
  styleUrls: ['./display-all-questions.component.scss']
})
export class DisplayAllQuestionsComponent implements OnInit {
  isLoadingResults: boolean;
  data: any;
  items: any;
  temp: any;
  tagSearch: any;
  count = 0;
  url: String;
  isLiked = false;
  bntStyle = 'btn-default';
  toppings = new FormControl();
  tags: string[] = ['Java', 'JSP', 'PHP', 'Python', 'MongoDB'];
  search: String = '';


  constructor(
    private main : MainService,
    public router : Router,
    private title : Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Questions");
    this.isLoadingResults = true;
    this.main.getQuestions()
    .subscribe((res: any) => {
      function comp(b, a) {
        return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
      }
      function answer(b, a) {
        return (a.vote.length - a.downvote.length) - (b.vote.length - b.downvote.length);
      }
      for (let i = 0; i < res.length; i++) {
        res[i].answers = res[i].answers.sort(answer);
      }
      
      this.temp = res.sort(comp);
      this.items = this.temp;
      this.data = this.items.slice(0,5);

      this.isLoadingResults = false;
    }, err => {
      console.log(err);
      this.isLoadingResults = false;
    });
  }

  onPageChange($event) {
    this.data =  this.items.slice($event.pageIndex*$event.pageSize, $event.pageIndex*$event.pageSize + $event.pageSize);
  }

  onKeydown(event) {
    this.count = 0;
    this.items = [];
    for(let i=0; i < this.temp.length; i++){
      let question = this.temp[i].question.toUpperCase( );
      let search = this.search.toUpperCase( );
      if(question.includes(search)){
        this.items[this.count] = this.temp[i];
        this.count = this.count + 1;
      }
    }
    if(this.search == ''){
      this.items = this.temp;
      this.count = 0;
    }
    this.data = this.items.slice(0,5);
  }

  tagFilter(){
    let tags = [];
    this.count = 0;
    this.items = [];
    let checker = (arr, target) => target.every(v => arr.includes(v));
    for(let i=0; i < this.temp.length; i++){
      tags = [];
      for(let j=0; j < this.temp[i].tags.length; j++){
        tags[j] = this.temp[i].tags[j].item_text;
      }
      if(checker(tags, this.tagSearch)){
        this.items[this.count] = this.temp[i];
        
        this.count = this.count + 1;
      }
    }
    if(this.tagSearch[0] == null){
      this.items = this.temp;
    }
    this.data = this.items.slice(0,5);
  }
}
