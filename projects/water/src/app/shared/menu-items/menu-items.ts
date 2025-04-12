import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'admin-dashboard', name: 'Dashboard', type: 'link', icon: 'water_drop'},
  { state: 'all-landlords', name:  'All Landlords', type: 'link', icon: 'dashboard_customize'},
  { state: 'client-dashboard', name: 'Client Dashboard', type: 'link', icon: 'water_damage'},
  { state: 'meter-overview', name: 'Meter Overview', type: 'link', icon: 'av_timer'},
  { state: 'user-management', name: 'User Management', type: 'link', icon: 'group_add'},
  { state: 'record-management', name: 'Consumption Records', type: 'link', icon: 'manage_history'},
  { state: 'invoice-management', name: 'Invoice Management', type: 'link', icon: 'ballot'},
  { state: 'payment-management', name: 'Payment Management', type: 'link', icon: 'payment'},
  { state: 'admin-settings', name: 'Admin Settings', type: 'link', icon: 'manage_accounts'},
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
