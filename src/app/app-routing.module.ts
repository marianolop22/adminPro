import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';

import { LoginGuard } from './services/service.index';
import { PagesComponent } from './pages/pages.component';

const routes: Routes = [
  {path:'login', component: LoginComponent },
  {path:'register', component: RegisterComponent },
  {
    path:'', component: PagesComponent, 
    canActivate: [LoginGuard],
    loadChildren: './pages/pages.module#PagesModule'
  },
  // { 
  //   path: '', 
  //   component: PagesComponent,
  //   loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
  // },
  {path:'**', component: NopagefoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
