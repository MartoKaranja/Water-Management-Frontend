import { Routes } from '@angular/router';
import { WaterDashboardComponent } from './water-dashboard/water-dashboard.component';
import { AddUserComponent } from './add-user/add-user.component';


export const AdminDashboardRoutes: Routes = [
  {
    path: '', component: WaterDashboardComponent,

  },
  {
    path: 'admin-dashboard',component:  WaterDashboardComponent ,
  },
  {
    path: 'add-user',component:  AddUserComponent ,
  }

];
