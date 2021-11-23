import { HttpService } from './../http.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';


class ImageSnippet {
  constructor(public src: string, public file: File) { }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // img1 = 'assets/head-1.png'; //測試用

  titleRegister = "註冊";
  myreg = /^([\w\.\-]){1,64}\@([\w\.\-]){1,64}$/;
  imgData = ''; //圖檔
  name = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  nameState = '';//驗證name狀態
  emailState = '';  //驗證email狀態
  psswordSrror = ''; //驗證password狀態
  imgsrc = 'https://i2.bahamut.com.tw/none.gif'; //預設大頭圖
  stateMailColor: any; //mail狀態顏色
  stateNameColor: any //name狀態顏色

  previewImage: any;
  //預設大頭圖

  //DomSanitizer有助於防止跨站脚本安全漏洞（XSS），通过清除值以便在不同的DOM上下文中安全使用。
  constructor(private httpService: HttpService, public sd: DomSanitizer) { }

  ngOnInit(): void { }

  byteString: any;
  mimeString: any;
  ia: any;
  blob: any;


  //預覽圖檔------------------------------------------------------------------------
  changed(event) {
    let input = event.target; //把EventTarget型別轉成HTMLInputElement 型別

    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(input.files[0]);

      reader.onload = (e: any) => {
        this.previewImage = e.target.result;
        console.log("this.previewImage = " + this.previewImage); //base64  string

        // if (this.previewImage.split(',')[0].indexOf('base64') > 0) {
        //   this.byteString = atob(this.previewImage.split(',')[1]);
          // console.log('this.byteString = ' + this.byteString);
        // } else {
        //   this.byteString = unescape(this.previewImage.split(',')[1]);
        // }
        //圖檔屬性 image/png
      //   this.mimeString = this.previewImage.split(',')[0].split(':')[1].split(';')[0];

      //   this.ia = new Uint8Array(this.byteString.length);
      //   for (var i = 0; i < this.byteString.length; i++) {
      //     this.ia[i] = this.byteString.charCodeAt(i);
      //     // console.log(this.ia[i]);
      //   }
      //   console.log('this.ia = ' + this.ia);
      //   // console.log("blob = " + this.blob); // [object Blob]
      //   this.blob = new Blob([this.ia], { type: this.mimeString });
      }
      this.imgsrc = window.URL.createObjectURL(input.files[0]); // 取得上傳圖片記體暫時路徑
      // console.log("this.imgsrc = " + this.imgsrc); //blob:http://localhost:4200/73708780-b697-452d-acfb-c0ec22b830b2

    }
  }

  //name驗證
  getNameVerify() {
    if (this.name.value == '') {
      this.stateNameColor = false //email驗證狀態的顏色
      this.nameState = '請輸入name';
      sessionStorage.setItem('name', 'false');
    } else {
      this.stateNameColor = true //email驗證狀態的顏色
      this.nameState = 'ok';
      sessionStorage.setItem('name', 'true');
    }
  }

  //email驗證
  getEmailVerify() {
    if (this.email.value == '') { //如果沒輸入
      this.emailState = '請輸入有效的Email！';
      this.stateMailColor = false //email驗證狀態的顏色
      sessionStorage.setItem('email', 'false');

    } else if (this.myreg.test(this.email.value) == false) { //驗證email格式
      this.emailState = 'email 格式錯誤！';
      this.stateMailColor = false;
      sessionStorage.setItem('email', 'false');

    } else {
      this.httpService.doEmailVerify(this.email.value).subscribe(response => {
        this.emailState = response.email;

        if (this.emailState == '重複') { //如果傳回值是'重複'
          this.stateMailColor = false;
          sessionStorage.setItem('email', 'false');

        } else {
          console.log("OK");
          this.stateMailColor = true;
          sessionStorage.setItem('email', 'true');
        }
      });
    }
  }

  //註冊
  getRegister() {
    if (this.name.value == '') {
      this.nameState = '請輸入name';
    } else if (this.email.value == '') {
      this.emailState = '請輸入email';
    } else if (this.password.value == '') { //如果email驗證錯誤
      this.psswordSrror = '請輸入密碼';
    } else if (this.password.value.length < 4) { //如果密碼小於4碼
      this.psswordSrror = '密碼不能小於4碼';
    } else if (sessionStorage.getItem('email') == 'false') { //email格式錯誤
      this.emailState = 'email重複';
    } else {
      this.httpService.doRegister(
        this.previewImage,
        this.name.value,
        this.email.value,
        this.password.value
      ).subscribe();
      window.location.assign('/login');
      alert('註冊成功');
    }
  }
}
