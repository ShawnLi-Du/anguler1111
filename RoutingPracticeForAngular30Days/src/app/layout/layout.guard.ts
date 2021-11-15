import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutGuard implements CanActivate {

  canActivate(  //路由守門員, 判斷能否登入
    next: ActivatedRouteSnapshot,  //傳入資訊
    state: RouterStateSnapshot  //傳入狀態
  ): Observable<boolean> | Promise<boolean> | boolean {

    const canActivate = next.queryParams['name'] === 'Leo';
    if (!canActivate) {
      alert('你不是Leo，不能進去！');
    }

    return canActivate;

  }

}
