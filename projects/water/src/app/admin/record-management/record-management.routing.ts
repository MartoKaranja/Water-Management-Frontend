import { Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CurrentMonthSummaryComponent } from './current-month-summary/current-month-summary.component';
import { MonthlyViewComponent } from './monthly-view/monthly-view.component';

export const RecordManagementRoutes: Routes = [
  {
    path: '', component: DashboardComponent,

  },
  {
    path: 'current-monthly-view', component: CurrentMonthSummaryComponent,

  },
  {
    path: 'monthly-view', component: MonthlyViewComponent,

  }
];
