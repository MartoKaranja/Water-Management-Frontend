import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsercredentialsService {

  private _username !: string;

  constructor() {

   }

  get username(): string {
    return 'Welcome ' + localStorage.getItem("username")
  }

  set username(username: string) {
    localStorage.setItem("username", username)
  }
}
