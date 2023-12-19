import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const PRODLANDLORDMENUITEMS = [
  { state: 'landlord', name:  'Landlord Dashboard', type: 'link', icon: 'dashboard'},
  { state: 'client-dashboard', name: 'Client Dashboard', type: 'link', icon: 'water_damage'},
  { state: 'meter-overview', name: 'Meter Overview', type: 'link', icon: 'av_timer'},
  { state: 'user-management', name: 'User Management', type: 'link', icon: 'group_add'},
  { state: 'record-management', name: 'Records Mangement', type: 'link', icon: 'manage_history'},
  { state: 'payment-management', name: 'Payment Mangement', type: 'link', icon: 'payment'},
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
