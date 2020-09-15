import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  name: String;
  username: String;
  email: String;
  password: String;
  
  constructor(
    private authService: AuthService,
    public router: Router,
    private title: Title,
    public _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Login");
    const signUpButton = document.getElementById('signUp');
    const signInButton = document.getElementById('signIn');
    const container = document.getElementById('container');

    signUpButton.addEventListener('click', () => {
      container.classList.add("right-panel-active");
      this.title.setTitle("Sign Up");
    });
    signInButton.addEventListener('click', () => {
      container.classList.remove("right-panel-active");
      this.title.setTitle("Login");
    });
  }

  onLoginSubmit() {
    const user = {
      username: this.username,
      password: this.password
    };
    this.authService.authenticateUser(user).subscribe((data: any) => {
      console.log(data)
      if (data.success) {
        this.authService.storeUserData(data.token, data.user);
        this._snackBar.open("Welcome " + data.user.name, "OK", {
          duration: 2000,
        });
        this.router.navigate(["/profile/"+data.user.id]);
      } else {
        this.router.navigate(["/login"]);
        this._snackBar.open(data.msg, "OK", {
          duration: 2000,
        });
      }
    });
  }
  onRegisterSubmit() {
    const user = {
      name: this.name,
      email: this.email,
      username: this.username,
      password: this.password
    };

    // Register user
    this.authService.registerUser(user).subscribe((data: any) => {
      console.log(data);
      if (data.success) {
        this._snackBar.open(data.msg, "OK", {
          duration: 2000,
        });
        const container = document.getElementById('container');
        container.classList.remove("right-panel-active");
      } else {
        this._snackBar.open(data.msg, "OK", {
          duration: 2000,
        });
        const container = document.getElementById('container');
        container.classList.add("right-panel-active");
      }
    });
  }

}
