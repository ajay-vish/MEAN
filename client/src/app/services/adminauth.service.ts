import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";

const server = "http://localhost:3000/admin";

const headers = new HttpHeaders({ "Content-Type": "application/json" });

@Injectable()
export class AdminauthService {
  authToken: any;
  admin: any;
  constructor(private http: HttpClient) {}

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  authenticateAdmin(admin): Observable<any[]> {
    return this.http
      .post<any[]>(`${server}/authenticate`, admin, { headers: headers })
      .pipe(
        tap(data =>console.log("Admin authenticated" + data)),
        catchError(this.handleError("authenticateAdmin", []))
      );
  }

  // registerAdmin(admin): Observable<any[]> {
  //   return this.http
  //   .post<any[]>(`${server}/register`, admin, { headers: headers })
  //     .pipe(
  //       tap(data => console.log("Admin registered" + data)),
  //       catchError(this.handleError("authenticateAdmin", []))
  //     );
  // }

  getProfile(): Observable<any[]> {
    let header = headers.append("Authorization", this.authToken);
    return this.http
      .get<any[]>(`${server}/profile`, { headers: header })
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError("getProfile", []))
      );
  }

  getDashboard(): Observable<any[]> {
    let header = headers.append("Authorization", this.authToken);
    return this.http
      .get<any[]>(`${server}/dashboard`, { headers: header })
      .pipe(
        tap(data => console.log(data)),
        catchError(this.handleError("getDashboard", []))
      );
  }

  storeAdminData(token, admin) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("admin", JSON.stringify(admin));
    this.authToken = token;
    this.admin = admin;
  }

  loadToken() {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
  }

  logout() {
    this.authToken = null;
    this.admin = null;
    localStorage.clear();
  }
}
