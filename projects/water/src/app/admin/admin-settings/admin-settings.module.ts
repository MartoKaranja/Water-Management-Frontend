import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../../demo-material-module';
import { AdminSettingsRoutes } from './admin-settings.routing';
import { RouterModule } from '@angular/router';
import { MpesaSettingsComponent } from './mpesa-settings/mpesa-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    MpesaSettingsComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(AdminSettingsRoutes),
    DemoMaterialModule
  ]
})
export class AdminSettingsModule { }
