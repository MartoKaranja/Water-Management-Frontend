import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'admin-dashboard', name: 'Dashboard', type: 'link', icon: 'water_drop'},
  { state: 'client-dashboard', name: 'Client Dashboard', type: 'link', icon: 'water_damage'},
  { state: 'meter-overview', name: 'Meter Overview', type: 'link', icon: 'av_timer'},
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
