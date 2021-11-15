import { LayoutGuard } from './layout/layout.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadAllModules } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { EnsureLoginGuard } from './login/ensure-login.guard';

const routes: Routes = [

  {
    path: '',
    component: LayoutComponent,
    canActivate: [LayoutGuard], //跳到layout.guard.ts, 判斷是否能登入
    children: [
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'about',
        component: AboutComponent
      }
    ]
  },
  {
    path: 'login',
    component: LoginComponent,
    canDeactivate: [EnsureLoginGuard] //如果要離開頁面,判斷
  },
  // Angular 8+
  {
    path: 'feature',
    loadChildren: () => import('./feature/feature.module').then(module => module.FeatureModule)
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    // enableTracing: true
    useHash: true,
    preloadingStrategy: PreloadAllModules  //啟用預先載入
  })],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
