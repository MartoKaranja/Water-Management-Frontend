import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const PRODMENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  { state: 'schedule', type: 'link', name: 'Schedule questions', icon: 'insert_invitation' },
  { state: 'questions', type: 'link', name: 'Questions', icon: 'assignment' },
  { state: 'export', type: 'link', name: 'Export Results', icon: 'import_export' },
  { state: 'customer-order', type: 'link', name: 'Place Order', icon: 'paid' }

];

@Injectable()
export class ProdMenuItems {
  getMenuitem(): Menu[] {
    return PRODMENUITEMS;
  }
}
