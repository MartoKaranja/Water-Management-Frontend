import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DemoMaterialModule } from 'projects/water_sys/src/app/demo-material-module';
import { UserManagementRoutes } from './user-management.routing';
import { UsersComponent } from './users/users.component';



@NgModule({
  declarations: [
    DashboardComponent,
    EditUserComponent,
    UsersComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(UserManagementRoutes),
    ReactiveFormsModule
  ]
})
export class UserManagementModule { }
