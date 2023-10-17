import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { PaymentReportsSummaryComponent } from './payment-reports-summary/payment-reports-summary.component';
import { UserPaymentReportsSummaryComponent } from './user-payment-reports-summary/user-payment-reports-summary.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  declarations: [
    PaymentReportsSummaryComponent,
    UserPaymentReportsSummaryComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule
  ],
  exports: [
    PaymentReportsSummaryComponent,
    UserPaymentReportsSummaryComponent
  ]
})
export class PaymentModule { }
