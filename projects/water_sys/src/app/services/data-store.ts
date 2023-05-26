import { Injectable } from '@angular/core';


@Injectable()
export class DataStorage {
  private storageKey = 'GeneratedAnswersList';

  constructor() { }

  setData(data: any) {
    localStorage.setItem(this.storageKey, JSON.stringify(data));
  }

  getData(): any {
    const data = localStorage.getItem(this.storageKey);
    return data ? JSON.parse(data) : null;
  }

  deleteData() {
    localStorage.removeItem(this.storageKey);
  }
}
