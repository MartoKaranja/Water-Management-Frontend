import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';


export const ConsumptionReportRoutes: Routes = [
  {
    path: '', component: DashboardComponent,
  }
];
