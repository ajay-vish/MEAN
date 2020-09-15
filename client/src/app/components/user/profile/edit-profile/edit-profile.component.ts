import { Component, OnInit } from '@angular/core';
import { MainService } from 'src/app/services/main.service';
import { AuthService } from 'src/app/services/auth.service';
import { DatePipe } from '@angular/common';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  id: String;
  userdata: any;

  dropdownList = [];
  selectedItems = [];
  dropdownSettings: IDropdownSettings;

  constructor(
    private main: MainService,
    private auth: AuthService,
    public datepipe: DatePipe,
    public _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.dropdownList = [
      { item_id: 1, item_text: 'Java' },
      { item_id: 2, item_text: 'Python' },
      { item_id: 3, item_text: 'JSP' },
      { item_id: 4, item_text: 'MongoDB' },
      { item_id: 5, item_text: 'PHP' }
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
    const user = JSON.parse(localStorage.getItem("user"));
    this.id = user.id;
    this.auth.getProfileById(this.id).subscribe((data: any) => {
      this.userdata = data.user;
      this.selectedItems = this.userdata.skill;
      this.userdata.birthdate =this.datepipe.transform(this.userdata.birthdate, 'yyyy-MM-dd');
    });
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  updateProfile() {
    const user = {
      username: this.userdata.username,
      email: this.userdata.email,
      name: this.userdata.name,
      specialization: this.userdata.specialization,
      mobile: this.userdata.mobile,
      birthdate: this.userdata.birthdate,
      gender: this.userdata.gender,
      website: this.userdata.website,
      address: {
        line:this.userdata.address.line,
        city: this.userdata.address.city,
        country: this.userdata.address.country,
        pincode: this.userdata.address.pincode,
      },
      job: {
        jobone: {
          title: this.userdata.job.jobone.title,
          description: this.userdata.job.jobone.description,
        },
        jobtwo: {
          title: this.userdata.job.jobtwo.title,
          description: this.userdata.job.jobtwo.description,
        }
      },
      skill: this.selectedItems
    }
    this.auth.updateProfile(user,this.userdata._id).subscribe((data: any) => {
      this._snackBar.open("Your profile has been updated", "OK", {
        duration: 2000,
      });
      this.userdata = data;
      this.userdata.birthdate =this.datepipe.transform(this.userdata.birthdate, 'yyyy-MM-dd');
    });
  }

}
