import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutGuard implements CanActivate {

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    const canActivate = next.queryParams['name'] === 'Leo';
console.log("canActivate = " + canActivate);
    if (!canActivate) {
      alert('你不是Leo，不能進去！');
    }

    return canActivate;

  }

}
