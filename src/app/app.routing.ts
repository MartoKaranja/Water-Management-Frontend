import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginLayoutComponent } from './login/login-layout/login-layout.component';
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
        path: '',
        loadChildren:
          () => import('./material-component/material.module').then(m => m.MaterialComponentsModule)
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./client/admin-dashboard/admin-dashboard.module').then(m => m.AdminDashboardModule)
      },
      {
        path: 'dashboard-old',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'schedule',
        loadChildren: () => import('./client/schedule/schedule.module').then(m => m.ScheduleModule)
      },
      {
        path: 'customer-order',
        loadChildren: () => import('./client/order-form/order-form.module').then(m => m.OrderModule)
      },
      {
        path: 'questions',
        loadChildren:
          () => import('./client/questions/questions.module').then(m => m.QuestionsModule)
      },
      {
        path: 'usage',
        loadChildren:
          () => import('./client/usage/usage.module').then(m => m.UsageModule)
      },
      {
        path: 'generated-answers',
        loadChildren:
          () => import('./client/generated-answers/generated-answers.module').then(m => m.GeneratedAnswersModule)
      },
      {
        path: 'bulk-generate',
        loadChildren:
          () => import('./client/bulk-generate/bulk-generate.module').then(m => m.BulkGenerateModule)
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
