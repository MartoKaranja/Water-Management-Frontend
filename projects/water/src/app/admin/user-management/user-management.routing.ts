import { DashboardComponent } from './dashboard/dashboard.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { Routes } from '@angular/router';


export const UserManagementRoutes: Routes = [
  {
    path: '', component: DashboardComponent,

  },
  {
    path: ':id', component: DashboardComponent,

  }


];
