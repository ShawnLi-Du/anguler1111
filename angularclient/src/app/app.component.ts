import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private http: HttpClient) { }
  title = '會員登入';
  author = 'by Faust, 2019,9,28';
  total = '(unknown)';


  public onTotal(): void {
    this.http
      .get('http://localhost:7070/')
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
      .subscribe(data => { this.total = data.toString(); });
    return;
  }

  private handleError(error: any) {
    const errMsg = (error.message) ?
      error.message :
      error.status ?
        'status: ${error.status}, ${error.statusText}' :
        'Server error with no status';
    window.alert(errMsg);
    return throwError(errMsg);
  }

}
