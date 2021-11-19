import { HttpService } from './../http.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  titleRegister = "註冊";
  myreg = /^([\w\.\-]){1,64}\@([\w\.\-]){1,64}$/;
  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  emailState = '';  //驗證email狀態
  psswordSrror = ''; //驗證password狀態

  constructor(private httpService: HttpService) { }

  ngOnInit(): void { }

  //email驗證
  getEmailVerify() {
    if (this.email.value == '') { //如果沒輸入
      this.emailState = '請輸入有效的Email！';
      sessionStorage.setItem('email', 'false');
    } else if (this.myreg.test(this.email.value) == false) { //驗證email格式
      this.emailState = 'email 格式錯誤！';
      sessionStorage.setItem('email', 'false');
    } else {
      this.httpService.doEmailVerify(this.email.value).subscribe(response => {
        this.emailState = response.email;
        if (this.emailState == '重複') {
          sessionStorage.setItem('email', 'false');
        } else {
          sessionStorage.setItem('email', 'true');
        }
      });
    }
  }

  //註冊
  getRegister() {

    if (this.email.value == '') {
      this.emailState = '請輸入email';
    } else if (this.password.value == '') { //如果email驗證錯誤
      this.psswordSrror = '請輸入密碼';
    } else if (this.password.value.length < 4) { //如果密碼小於4碼
      this.psswordSrror = '密碼不能小於4碼';
    } else if (sessionStorage.getItem('email') == 'false') { //email格式錯誤
      this.emailState = 'email重複';
    } else {
      this.httpService.doRegister(this.email.value, this.password.value).subscribe();
      window.location.assign('/login');
      alert('註冊成功');
    }

  }

}
