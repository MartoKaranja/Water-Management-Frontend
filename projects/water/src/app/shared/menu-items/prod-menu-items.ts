import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const PRODMENUITEMS = [
  { state: 'admin-dashboard', name: 'Dashboard', type: 'link', icon: 'water_drop'},
  { state: 'client-dashboard', name: 'Client Dashboard', type: 'link', icon: 'water_damage'},

];

@Injectable()
export class ProdMenuItems {
  getMenuitem(): Menu[] {
    return PRODMENUITEMS;
  }
}
