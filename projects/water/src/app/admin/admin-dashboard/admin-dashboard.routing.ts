import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { WaterDashboardComponent } from './water-dashboard/water-dashboard.component';
import { AddUserComponent } from './add-user/add-user.component';


export const AdminDashboardRoutes: Routes = [
  {
    path: '', component: WaterDashboardComponent,

  },
  {
    path: 'admin-dashboard',component:  DashboardComponent ,
  },
  {
    path: 'add-user',component:  AddUserComponent ,
  }

];
