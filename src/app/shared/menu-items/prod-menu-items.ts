import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const PRODMENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', type: 'link', icon: 'av_timer' },
  { state: 'bulk-generate', type: 'link', name: 'Schedule Content', icon: 'generating_tokens' },
  { state: 'schedule', type: 'link', name: 'Schedule Questions', icon: 'insert_invitation' },
  { state: 'questions', type: 'link', name: 'Questions', icon: 'assignment' },
  { state: 'export', type: 'link', name: 'Export Results', icon: 'import_export' },
  { state: 'usage', type: 'link', name: 'API Usage', icon: 'trending_up' },
  { state: 'customer-order', type: 'link', name: 'Place Order', icon: 'paid' },
  { state: 'generated-answers', type: 'link', name: 'Generated Answers', icon: 'file_present' }

];

@Injectable()
export class ProdMenuItems {
  getMenuitem(): Menu[] {
    return PRODMENUITEMS;
  }
}
