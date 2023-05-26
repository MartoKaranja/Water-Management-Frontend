import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardRoutes } from './admin-dashboard.routing';
import { DemoMaterialModule } from '../demo-material-module';
import { AnswersSummaryComponent } from './dashboard/answers-summary/answers-summary.component';
import { DatabaseSummaryComponent } from './dashboard/database-summary/database-summary.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AnswersSummaryComponent,
    DatabaseSummaryComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(AdminDashboardRoutes),
  ]
})
export class AdminDashboardModule { }
