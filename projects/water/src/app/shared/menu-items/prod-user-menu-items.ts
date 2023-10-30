import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const PRODUSERMENUITEMS = [
  { state: 'client-payment', name: 'Purchase Tokens', type: 'link', icon: 'payment'},
  { state: 'meter-overview', name: 'Valve Control', type: 'link', icon: 'hourglass_empty'},
  { state: 'user-consumption-reports', name: 'Consumption Reports', type: 'link', icon: 'water_damage'},
  { state: 'user-payment-reports', name: 'Payment History', type: 'link', icon: 'manage_history'},
  { state: 'admin-settings', name: 'Settings', type: 'link', icon: 'manage_accounts'},

];

@Injectable()
export class ProdUserMenuItems {
  getMenuitem(): Menu[] {
    return PRODUSERMENUITEMS;
  }
  // Add a new addMenuItem method
  addMenuItem(menuItem: Menu) {
    PRODUSERMENUITEMS.unshift(menuItem);
  }
}
