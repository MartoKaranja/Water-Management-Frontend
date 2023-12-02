import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../../demo-material-module';
import { AdminSettingsRoutes } from './admin-settings.routing';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MpesaSettingsComponent } from './mpesa-settings/mpesa-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserDetailsUpdateComponent } from './user-details-update/user-details-update.component';
import { TokenUpdateComponent } from './token-update/token-update.component';
import { TasksSummaryComponent } from './tasks-summary/tasks-summary.component';
import { TasksResultsDialogComponent } from './tasks-results-dialog/tasks-results-dialog.component';



@NgModule({
  declarations: [
    MpesaSettingsComponent,
    DashboardComponent,
    UserDetailsUpdateComponent,
    TokenUpdateComponent,
    TasksSummaryComponent,
    TasksResultsDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(AdminSettingsRoutes),
    DemoMaterialModule
  ]
})
export class AdminSettingsModule { }
