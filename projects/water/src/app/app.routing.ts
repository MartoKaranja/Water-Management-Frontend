import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { AuthGuard, LoginGuard } from './auth.guard';

export const AppRoutes: Routes = [


  {
    path: '',
    component: FullComponent,
    children: [
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full'
      },
      {
        path: 'admin-dashboard',
        loadChildren: () => import('./admin/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule)
      },
      {
        path: 'client-dashboard',
        loadChildren: () => import('./client/client-dashboard/client-dashboard.module').then(m => m.ClientDashboardModule)
      },
      {
        path: 'meter-overview',
        loadChildren: () => import('./admin/meter-overview/meter-overview.module').then(m => m.MeterOverviewModule)
      },
      {
        path: 'user-management',
        loadChildren: () => import('./admin/user-management/user-management.module').then(m => m.UserManagementModule)
      },
      {
        path: 'record-management',
        loadChildren: () => import('./admin/record-management/record-management.module').then(m => m.RecordManagementModule)
      },
      {
        path: 'payment-management',
        loadChildren: () => import('./admin/payment-reports/payment-reports.module').then(m => m.PaymentReportsModule)
      },
      {
        path: 'admin-settings',
        loadChildren: () => import('./admin/admin-settings/admin-settings.module').then(m => m.AdminSettingsModule)
      }
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'auth',
    loadChildren:
    () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [LoginGuard],
  },
  {
    path:'**',
    redirectTo:'/dashboard'
  }

];
