import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-find-password',
  templateUrl: './find-password.component.html',
  styleUrls: ['./find-password.component.css']
})
export class FindPasswordComponent implements OnInit {

  titleFindPassword = "密碼重製";
  email = new FormControl('', [Validators.required, Validators.maxLength(10)]);
  posts: any;

  constructor(private httpService: HttpService) { }

  ngOnInit(): void {
  }

  doFindPassword() {
    this.httpService.getFindPassword(this.email.value).subscribe(
      response => {
        if (response == null) {
          alert('查無此email');
        } else {
          window.location.assign('/login');
          alert('重製成功');
        }
       });

  }

}
