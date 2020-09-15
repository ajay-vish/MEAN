import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdminauthService } from 'src/app/services/adminauth.service';

@Component({
  selector: 'admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.scss']
})
export class AdminNavbarComponent implements OnInit {

  constructor(
    private adminAuth: AdminauthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.adminAuth.logout();
    this.router.navigate(["/admin/login"]);
  }
}
