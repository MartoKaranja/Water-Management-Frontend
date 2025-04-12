import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const PRODLANDLORDMENUITEMS = [
  { state: 'landlord', name:  'Dashboard', type: 'link', icon: 'dashboard'},
  { state: 'client-dashboard', name: 'Client Dashboard', type: 'link', icon: 'water_damage'},
  { state: 'meter-overview', name: 'Meter Overview', type: 'link', icon: 'av_timer'},
  { state: 'record-management', name: 'Consumption Records', type: 'link', icon: 'manage_history'},
  { state: 'invoice-management', name: 'Invoice Management', type: 'link', icon: 'ballot'},
  { state: 'payment-management', name: 'Payment Management', type: 'link', icon: 'payment'},
  { state: 'admin-settings', name: 'Admin Settings', type: 'link', icon: 'manage_accounts'},
];

@Injectable()
export class ProdLandlordMenuItems {
  getMenuitem(): Menu[] {
    return PRODLANDLORDMENUITEMS;
  }
  // Add a new addMenuItem method
  addMenuItem(menuItem: Menu) {
    PRODLANDLORDMENUITEMS.unshift(menuItem);
  }
}
