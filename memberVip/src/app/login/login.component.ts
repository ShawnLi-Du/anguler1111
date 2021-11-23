import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  title = "登入";
  account = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  posts: any;
  LoginStatus: any; //登入狀態'true' of 'false'

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.LoginStatus = sessionStorage.getItem('login'); //取得登入狀態
    // if (sessionStorage.getItem('login') == 'true') { //如果登入狀態為true
    //   window.location.assign('memberProfile');
    // } else {
      // window.location.assign('login');
    // }
  }

  doLogin() {

    if (this.account.value == '' || this.password.value == '') { //如果沒輸入
      alert('請輸入email 和 password');
    } else {
      this.httpService.getPosts(this.account.value, this.password.value).subscribe(
        response => {
          if (response.no == 0) {
            alert('email 或 password 輸入錯誤');
          } else {
            sessionStorage.setItem('loginNo', response.no);
            sessionStorage.setItem('loginImgData', response.img);
            sessionStorage.setItem('loginName', response.name);
            sessionStorage.setItem('loginEmail', response.email);
            sessionStorage.setItem('loginPassword', response.password);

            sessionStorage.setItem('login', 'true'); //登入成功
            console.log(sessionStorage.getItem('loginNo'));
            window.location.assign('http://localhost:4200/#/memberProfile');
          }
        });
    }
  }
}
