import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { RouterModule } from '@angular/router';
import { AdminDashboardRoutes } from './dashboard.routing';
import { UsersComponent } from './dashboard/users/users.component';



@NgModule({
  declarations: [
    DashboardComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(AdminDashboardRoutes),
  ]
})
export class DashboardModule { }
