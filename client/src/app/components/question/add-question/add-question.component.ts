import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent implements OnInit {

  question: String;
  description: String;
  user = localStorage.getItem('user');
  data = JSON.parse(this.user);
  userid= this.data.id;
  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings;
  
  constructor(
    private mainService: MainService,
    public router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.dropdownList = [
      { item_id: 1, item_text: 'Java' },
      { item_id: 2, item_text: 'Python' },
      { item_id: 3, item_text: 'JSP' },
      { item_id: 4, item_text: 'MongoDB' },
      { item_id: 5, item_text: 'PHP' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'JSP' },
      { item_id: 4, item_text: 'MongoDB' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 9,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
  
  onAddQuestion() {
    const question = {
      question: this.question,
      description: this.description,
      user: this.userid,
      tags: this.selectedItems
    };

    this.mainService.addQuestion(question).subscribe((data: any) => {
      if (data.success) {
        this._snackBar.open("Question added", "OK", {
          duration: 2000,
        });
        this.router.navigate(["/question"]);
      } else {
        console.log("Error");
      }
    });
  }

}
