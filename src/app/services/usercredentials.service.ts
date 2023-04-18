import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsercredentialsService {

  private _username: string = "Welcome new user";

  constructor() { }

  get username(): string {
    return this._username;
  }

  set username(username: string) {
    this._username = username;
  }
}
