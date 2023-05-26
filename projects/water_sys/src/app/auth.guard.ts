import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    console.log("Auth guard executing..")
    const authToken = localStorage.getItem('auth_token');

if (authToken !== null){
  console.log("Auth guard allowing access..")

      return true;
    } else
    {
      this.router.navigate(['/auth/login']);
      console.log("Navigating to login page")
      return false;
    }


  }

}

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor( private router: Router) {}

  canActivate(): boolean {
    console.log("Login guard executing..")

    const authToken = localStorage.getItem('auth_token');

    if (authToken === null) {
      console.log("Allowing access to login page");
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      console.log("Navigating to dashboard");
      return false;
    }


  }

}
