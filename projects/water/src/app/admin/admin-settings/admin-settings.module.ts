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



@NgModule({
  declarations: [
    MpesaSettingsComponent,
    DashboardComponent,
    UserDetailsUpdateComponent,
    TokenUpdateComponent
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
