import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { ClientDashboardRoutes } from './client-dashboard.routing';
import { DemoMaterialModule } from '../../demo-material-module';
import { PaymentModuleComponent } from '../shared/payment-module/payment-module.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserRecordsComponent } from './user-records/user-records.component';
import { UsersComponent } from './users/users.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { GraphsModule } from '../../admin/graphs/graphs.module';
import { SharedModule } from '../shared/shared.module';
import { DatePipe } from '@angular/common';
import { PaymentModule } from '../../admin/payment/payment.module';



@NgModule({
  declarations: [
    DashboardComponent,
    UserRecordsComponent,
    UsersComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ClientDashboardRoutes),
    DemoMaterialModule,
    ReactiveFormsModule,
    GraphsModule,
    PaymentModule,
    SharedModule
  ],
  providers : [DatePipe]

})
export class ClientDashboardModule { }
