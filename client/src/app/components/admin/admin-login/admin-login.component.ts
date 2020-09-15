import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AdminauthService } from 'src/app/services/adminauth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  constructor(
    public adminAuth: AdminauthService,
    public _snackBar: MatSnackBar,
    public router: Router
  ) { }

  username: String;
  password: String;
  
  ngOnInit(): void {
  }

  onSubmit(){
    const admin = {
      username: this.username,
      password: this.password
    }
    this.adminAuth.authenticateAdmin(admin).subscribe((data: any) => {
      console.log(data);
      if(data.success){
        this.adminAuth.storeAdminData(data.token, data.admin);
        this._snackBar.open("Welcome to admin panel" , "OK", {
          duration: 2000,
        });
        this.router.navigate(["/admin/dashboard"]);
      }else{
        this._snackBar.open(data.msg , "OK", {
          duration: 2000,
        });
      }
    })
  }

}
