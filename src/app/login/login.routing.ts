import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { SignupComponent } from './signup/signup.component';


export const LoginRoutes: Routes = [
  {
    path: '', component: LoginLayoutComponent, children: [
      {path: '', redirectTo:'/login', pathMatch: 'full'},
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent }]
  },

];
