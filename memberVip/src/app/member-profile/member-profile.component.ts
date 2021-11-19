import { Component, OnInit } from '@angular/core';
import { MatDrawerToggleResult, MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-member-profile',
  templateUrl: './member-profile.component.html',
  styleUrls: ['./member-profile.component.css']
})
export class MemberProfileComponent implements OnInit {
  programName: any; //預設頁面是第一隻程式
  no: any;
  email: any;
  password: any;

  constructor() { }

  ngOnInit(): void {
    this.doMemberProfile();
  }

  //帶入基本資料
  doMemberProfile() {
    this.no = sessionStorage.getItem('loginNo');
    this.email = sessionStorage.getItem('loginEmail');
    this.password = sessionStorage.getItem('loginPassword');
    this.programName = sessionStorage.getItem('loginEmail');
  }
  //登出
  toSignOut() {
    sessionStorage.removeItem('loginNo');
    window.location.assign('login');
  }

  toggleSideNav(drawer: MatSidenav) {
    drawer.toggle().then((result: MatDrawerToggleResult) => {
      console.log('選單狀態：' + result);
    });
  }
  doShow(item: any) {
    this.programName = item;
  }

}
