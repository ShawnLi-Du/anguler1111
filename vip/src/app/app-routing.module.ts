import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppConfig } from './app.config';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AppConfig]
})
export class AppRoutingModule { }
