import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminDashboardRoutes } from './admin-dashboard.routing';
import { DemoMaterialModule } from '../../demo-material-module';
import { AnswersSummaryComponent } from './dashboard/answers-summary/answers-summary.component';
import { DatabaseSummaryComponent } from './dashboard/database-summary/database-summary.component';
import { WaterDashboardComponent } from './water-dashboard/water-dashboard.component';
import { MeterRecordsComponent } from './water-dashboard/meter-records/meter-records.component';
import { UserRecordsComponent } from './water-dashboard/user-records/user-records.component';
import { AddUserComponent } from './add-user/add-user.component';
import { NewUserComponent } from '../meter/new-user/new-user.component';
import { NewLandlordComponent } from '../meter/new-landlord/new-landlord.component';
import { NewMeterComponent } from '../meter/new-meter/new-meter.component';



@NgModule({
  declarations: [
    DashboardComponent,
    AnswersSummaryComponent,
    DatabaseSummaryComponent,
    WaterDashboardComponent,
    MeterRecordsComponent,
    UserRecordsComponent,
    AddUserComponent,
    NewUserComponent,
    NewLandlordComponent,
    NewMeterComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(AdminDashboardRoutes),
    ReactiveFormsModule
  ]
})
export class AdminDashboardModule { }
