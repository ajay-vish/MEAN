import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

const server = 'http://localhost:3000/users';

const headers = new HttpHeaders({'Content-Type': 'application/json'})

@Injectable()
export class AuthService {
  authToken: any;
  user: any;
  public jwtHelper: JwtHelperService = new JwtHelperService()
  constructor(
    private http:HttpClient
    ) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('id_token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  registerUser(user): Observable<any[]> {
    return this.http.post<any[]>(`${server}/register`,user, {headers: headers})
      .pipe(
        tap(register => console.log('User register'+ register)),
        catchError(this.handleError('registerUser', []))
      );
  }

  authenticateUser(user): Observable<any[]> {
    return this.http.post<any[]>(`${server}/authenticate`,user, {headers: headers})
      .pipe(
        tap(data => console.log('User authenticated'+ data)),
        catchError(this.handleError('authenticateUsers', []))
      );
  }

  updateProfile(user, id): Observable<any[]> {
    return this.http.patch<any[]>(`${server}/profile/${id}`,user, {headers: headers})
      .pipe(
        tap(data => console.log('User info updated'+ data)),
        catchError(this.handleError('updateProfile', []))
      );
  }
  
  getProfile(user): Observable<any[]> {
    return this.http.get<any[]>(`${server}/${user.username}`, {headers: headers})
      .pipe(
        tap(data => console.log("Got Profile")),
        catchError(this.handleError('getProfile', []))
      );
  }

  getProfileById(id): Observable<any[]> {
    return this.http.get<any[]>(`${server}/profile/${id}`, {headers: headers})
      .pipe(
        tap(data => console.log("Got Profile")),
        catchError(this.handleError('getProfile', []))
      );
  }

  getDashboard(): Observable<any[]> {
    let header = headers.append('Authorization', this.authToken);
    return this.http.get<any[]>(`${server}/dashboard`, {headers: header})
      .pipe(
        tap(data => console.log( data)),
        catchError(this.handleError('getDashboard', []))
      );
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  
  public loggedIn(){
    if(this.authToken == null)
    {
      return false;
    }else{
      return true;
    }
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
