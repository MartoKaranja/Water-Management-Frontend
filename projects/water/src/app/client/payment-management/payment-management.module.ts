import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { PaymentManagementRoutes } from './payment-management.routing';
import { DemoMaterialModule } from 'projects/water_sys/src/app/demo-material-module';
import { PaymentModule } from '../../admin/payment/payment.module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PaymentManagementRoutes),
    DemoMaterialModule,
    SharedModule,
    PaymentModule

  ]
})
export class PaymentManagementModule { }
