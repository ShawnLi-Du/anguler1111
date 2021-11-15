import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginComponent } from './login.component';
import { CanDeactivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class EnsureLoginGuard implements CanDeactivate<LoginComponent> {

  /**
   * 當使用者要離開這個 Guard 所防守的路由時，會觸發這個函式
   *
   * @param {LoginComponent} component - 該路由的 Component
   * @param {ActivatedRouteSnapshot} currentRoute - 當前的路由
   * @param {RouterStateSnapshot} currentState - 當前路由狀態的快照
   * @param {RouterStateSnapshot} [nextState] - 欲前往路由的路由狀態的快照
   * @returns {(boolean | Observable<boolean> | Promise<boolean>)}
   * @memberof EnsureLoginGuard
   */
  canDeactivate(
    component: LoginComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {

    if (component.name.trim()) { //如果有輸入內容
      return confirm('是否要離開此頁面?');
    }
    return true;
  }

}
