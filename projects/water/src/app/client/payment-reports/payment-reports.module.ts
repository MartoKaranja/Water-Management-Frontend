import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PaymentReportRoutes } from './payment-reports.routing';
import { PaymentModule } from '../../admin/payment/payment.module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PaymentReportRoutes),
    PaymentModule
  ]
})
export class PaymentReportsModule { }
