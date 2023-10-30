import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const USERMENUITEMS = [
  { state: 'client-payment', name: 'Purchase Tokens', type: 'link', icon: 'payment'},
  { state: 'meter-overview', name: 'Valve Control', type: 'link', icon: 'hourglass_empty'},
  { state: 'user-consumption-reports', name: 'Consumption Reports', type: 'link', icon: 'water_damage'},
  { state: 'user-payment-reports', name: 'Payment History', type: 'link', icon: 'manage_history'},
  { state: 'admin-settings', name: 'Settings', type: 'link', icon: 'manage_accounts'},
];

@Injectable()
export class UserMenuItems {
  getMenuitem(): Menu[] {
    return USERMENUITEMS;
  }

  // Add a new addMenuItem method
  addMenuItem(menuItem: Menu) {
    USERMENUITEMS.unshift(menuItem);
  }
}
