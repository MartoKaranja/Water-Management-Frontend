import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';


export const ClientDashboardRoutes: Routes = [
  {
    path: '', component: DashboardComponent,
  },
  {
    path: ':user_name', component: DashboardComponent,

  }


];
