import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { MemberProfileComponent } from './member-profile/member-profile.component';
import { FindPasswordComponent } from './find-password/find-password.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login', // 登入頁面頁面
    component: LoginComponent
  },
  {
    path: 'register', //註冊頁面
    component: RegisterComponent
  },
  {
    path: 'memberProfile', //會員資料頁面
    component: MemberProfileComponent
  },
  {
    path: 'findPassword', //找回密碼頁面
    component: FindPasswordComponent
  },
  {
    path: '', // 登入頁面頁面
    component: LoginComponent
  },
  {
    path: '**', //不管是什麼樣的路徑都會符合
    redirectTo: '', //將當前路徑改回 '' 並重新導向過去
    pathMatch: 'full' //只要有使用 redirectTo 這個屬性的話，就必須要一併加入 pathMatch 這個屬性的設定，不然系統會拋出錯誤。
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // enableTracing: true, //在每次 Routing 改變的時候都會在控制台(console)裡印出Log
    useHash: true //加完這個屬性之後，畫面上就會出現 home works! 的字樣
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
