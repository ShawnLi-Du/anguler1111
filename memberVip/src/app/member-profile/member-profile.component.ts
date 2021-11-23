import { Component, OnInit } from '@angular/core';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css']
})
export class MemberProfileComponent implements OnInit {

  programName: any; //預設頁面是第一隻程式
  no: any;
  impData: any;
  email: any;
  password: any;
  imgsrc: any; //大頭圖
  LoginStatus: any; //登入狀態'true' of 'false'

  constructor(public sd: DomSanitizer) { }

  ngOnInit(): void {
    this.LoginStatus = sessionStorage.getItem('login'); //取得登入狀態
    if (sessionStorage.getItem('login') == 'true') { //如果登入狀態為true
      this.LoginStatus = true; //表示已登入可瀏覽資訊
      this.doMemberProfile(); //帶入參數
    } else {
      window.location.assign('login');
    }

  }

  //帶入基本資料
  doMemberProfile() {

    //取出會員資料
    this.no = sessionStorage.getItem('loginNo');
    this.impData = sessionStorage.getItem('loginImgData');
    this.programName = sessionStorage.getItem('loginName');
    this.email = sessionStorage.getItem('loginEmail');
    this.password = sessionStorage.getItem('loginPassword');
    this.imgsrc = sessionStorage.getItem('loginImgData');

  }
  //登出
  toSignOut() {
    this.LoginStatus = false;
    sessionStorage.setItem('login', 'false'); //登入狀態改 false
    sessionStorage.removeItem('loginNo');  //刪會員編號
    alert('登出成功');
    window.location.assign('login');
  }

  toggleSideNav(drawer: MatSidenav) {
    drawer.toggle().then((result: MatDrawerToggleResult) => {
    });
  }
  doShow(item: any) {
    this.programName = item;
  }

}
