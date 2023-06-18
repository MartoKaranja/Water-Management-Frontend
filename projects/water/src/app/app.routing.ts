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
        path: 'dashboard-old',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'schedule',
        loadChildren: () => import('./schedule/schedule.module').then(m => m.ScheduleModule)
      },
      {
        path: 'customer-order',
        loadChildren: () => import('./order-form/order-form.module').then(m => m.OrderModule)
      },
      {
        path: 'questions',
        loadChildren:
          () => import('./questions/questions.module').then(m => m.QuestionsModule)
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
