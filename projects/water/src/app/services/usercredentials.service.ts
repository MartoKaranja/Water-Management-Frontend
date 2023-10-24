import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsercredentialsService {

  private _username !: string;
  private _userType !: string;

  constructor() {

   }

  get username(): string {
    return localStorage.getItem("username") ?? "";
  }

  set username(username: string) {
    localStorage.setItem("username", username)
  }

   // Add a userType property with a getter and a setter
   get userType(): string {
    return localStorage.getItem("userType") ?? "user";
  }

  set userType(userType: string) {
    localStorage.setItem("userType", userType);
  }
}
