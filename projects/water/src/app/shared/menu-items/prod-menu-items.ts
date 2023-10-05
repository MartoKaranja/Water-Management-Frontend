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
  { state: 'meter-overview', name: 'Meter Overview', type: 'link', icon: 'water_damage'},
  { state: 'user-management', name: 'User Management', type: 'link', icon: 'group_add'},
  { state: 'record-management', name: 'Records Mangement', type: 'link', icon: 'manage_history'},
  { state: 'admin-settings', name: 'Admin Settings', type: 'link', icon: 'manage_accounts'},

];

@Injectable()
export class ProdMenuItems {
  getMenuitem(): Menu[] {
    return PRODMENUITEMS;
  }
}
