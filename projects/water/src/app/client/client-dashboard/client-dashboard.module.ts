import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { ClientDashboardRoutes } from './client-dashboard.routing';
import { DemoMaterialModule } from '../../demo-material-module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ClientDashboardRoutes),
    DemoMaterialModule
  ]
})
export class ClientDashboardModule { }
