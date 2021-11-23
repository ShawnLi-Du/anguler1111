import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { HttpParams, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})

export class HttpService {
  private urlGetPosts = 'http://localhost:7070/input'; //登入
  private urlFindPassword = 'http://localhost:7070/findPassword'; //重製密碼
  private urlEmailVerify = 'http://localhost:7070/emailVerify'; //email驗證
  private urlCreateMember = 'http://localhost:7070/createMember'; //註冊
  private urlMemberProfile = 'http://localhost:7070/memberProfile'; //抓取會員資料
  apiService: any;

  constructor(private http: HttpClient) { }

  // 註冊-email驗證
  doEmailVerify(email: String) {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json'
    });
    let options = {
      headers
    };
    let params = {
      'email': email
    };
    return this.http.post<any>(this.urlEmailVerify, params, options);
  }

  //註冊
  doRegister(imgData: any, name: String, email: String, password: String) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json'
    });
    let options = {
      headers
    };
    let params = {
      'img': imgData,
      'name': name,
      'email': email,
      'password': password
    };
    return this.http.post<any>(this.urlCreateMember, params, options);
  }

  //登入驗證
  getPosts(email: String, password: String) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json'
    });
    let options = {
      headers
    };
    let params = {
      'email': email,
      'password': password
    };
    return this.http.post<any>(this.urlGetPosts, params, options);
  }

  // 密碼重製
  getFindPassword(email: String) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json'
    });
    let options = {
      headers
    };
    let params = {
      'email': email
    };
    return this.http.post<any>(this.urlFindPassword, params, options);
  }
  // 抓取會員資料
  getMemberProfile(no: number) {

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'responseType': 'json'
    });
    let options = {
      headers
    };
    let params = {
      'no': no
    };
    return this.http.post<any>(this.urlMemberProfile, params, options);
  }

}
