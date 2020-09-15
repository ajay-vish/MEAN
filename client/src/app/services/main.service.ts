import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";

const server = "http://localhost:3000/";

const httpOptions = {
  headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable({
  providedIn: "root"
})
export class MainService {
  constructor(private http: HttpClient) {}

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }

  /*
    This is for question
  */

 getUsers(): Observable<any[]> {
  return this.http.get<any[]>(`${server}users`, httpOptions).pipe(
    tap(users => console.log("fetched users")),
    catchError(this.handleError("got users", []))
  );
}

  getReported(): Observable<any[]> {
    return this.http.get<any[]>(`${server}admin/reported`, httpOptions).pipe(
      tap(reported => console.log("fetched reported")),
      catchError(this.handleError("reported", []))
    );
  }

  getQuestions(): Observable<any[]> {
    return this.http.get<any[]>(`${server}questions`, httpOptions).pipe(
      tap(questions => console.log("fetched questions")),
      catchError(this.handleError("getSales", []))
    );
  }

  addQuestion(question): Observable<any[]> {
    return this.http
      .post<any[]>(`${server}questions`, question, httpOptions)
      .pipe(
        tap(questions => console.log("fetched questions")),
        catchError(this.handleError("getSales", []))
      );
  }

  updateQuestion(question): Observable<any[]> {
    return this.http
      .patch<any[]>(`${server}questions/${question._id}`, question, httpOptions)
      .pipe(
        tap(questions => console.log("fetched questions")),
        catchError(this.handleError("getSales", []))
      );
  }

  deleteQuestion(id): Observable<any[]> {
    return this.http
      .delete<any[]>(`${server}questions/${id}`, httpOptions)
      .pipe(
        tap(questions => console.log("fetched questions")),
        catchError(this.handleError("getSales", []))
      );
  }

  getQuestion(id): Observable<any> {
    return this.http.get<any>(`${server}questions/${id}`, httpOptions).pipe(
      tap(questions => console.log("fetched question")),
      catchError(this.handleError("getSales", []))
    );
  }

  /*
    This is for answer
  */

 getAnswers(): Observable<any[]> {
  return this.http.get<any[]>(`${server}answers`, httpOptions).pipe(
    tap(questions => console.log("fetched answers")),
    catchError(this.handleError("Get Answers", []))
  );
}

  addAnswer(answer): Observable<any[]> {
    return this.http.post<any[]>(`${server}answers`, answer, httpOptions).pipe(
      tap(answer => console.log("answers added")),
      catchError(this.handleError("addAnswer", []))
    );
  }

  updateAnswer(answer): Observable<any[]> {
    return this.http
      .patch<any[]>(`${server}answers/${answer._id}`, answer, httpOptions)
      .pipe(
        tap(answer => console.log("updated answers")),
        catchError(this.handleError("updateAnswer", []))
      );
  }

  voteAnswer(body): Observable<any[]> {
    return this.http
      .patch<any[]>(`${server}answers/vote/${body.id}`, body, httpOptions)
      .pipe(
        tap(answer => console.log("updated answers")),
        catchError(this.handleError("updateAnswer", []))
      );
  }

  deleteAnswer(id): Observable<any[]> {
    return this.http.delete<any[]>(`${server}answers/${id}`, httpOptions).pipe(
      tap(answer => console.log("delete answers")),
      catchError(this.handleError("deleteAnswer", []))
    );
  }

  like(body): Observable<any[]> {
    return this.http.patch<any[]>(`${server}users/like/${body.id}`,body, httpOptions)
      .pipe(
        tap(data => console.log('Liked')),
        catchError(this.handleError('Like', []))
      );
  }

  report(body): Observable<any[]> {
    return this.http.patch<any[]>(`${server}users/report/${body.id}`,body, httpOptions)
      .pipe(
        tap(data => console.log('Report')),
        catchError(this.handleError('Report', []))
      );
  }

  watch(body): Observable<any[]> {
    return this.http.patch<any[]>(`${server}questions/watch/${body.question_id}`,body, httpOptions)
      .pipe(
        tap(data => console.log('Watch')),
        catchError(this.handleError('Watch', []))
      );
  }

  /* 
    This is for chat room 
  */
  getChatRoomsChat(chatRoom) {
    return this.http.get(`${server}chatroom/${chatRoom}`);
  }

  getChatRooms(id): Observable<any> {
    return this.http.get<any>(`${server}chatroom/user/${id}`, httpOptions).pipe(
      tap(chats => console.log("fetched chats")),
      catchError(this.handleError("Failed chat", []))
    );
  }

  /* 
    For notifications 
  */
 
  getNotification(id): Observable<any> {
    return this.http.get<any>(`${server}notifications/${id}`, httpOptions).pipe(
      tap(notification => console.log("fetched notifications")),
      catchError(this.handleError("Error", []))
    );
  }

  notificationRead(id): Observable<any> {
    return this.http.patch<any[]>(`${server}notifications/${id}`, httpOptions)
      .pipe(
        tap(data => console.log('Read')),
        catchError(this.handleError('Read', []))
      );
  }
}
