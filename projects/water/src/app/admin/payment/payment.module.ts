import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { PaymentReportsSummaryComponent } from './payment-reports-summary/payment-reports-summary.component';
import { UserPaymentReportsSummaryComponent } from './user-payment-reports-summary/user-payment-reports-summary.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterPaymentReportsComponent } from './filter-payment-reports/filter-payment-reports.component';
import { UserPaymentReportsComponent } from './user-payment-reports/user-payment-reports.component';
import { MpesaPaymentDetailsComponent } from './mpesa-payment-details/mpesa-payment-details.component';



@NgModule({
  declarations: [
    PaymentReportsSummaryComponent,
    UserPaymentReportsSummaryComponent,
    DashboardComponent,
    FilterPaymentReportsComponent,
    UserPaymentReportsComponent,
    MpesaPaymentDetailsComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule
  ],
  exports: [
    PaymentReportsSummaryComponent,
    UserPaymentReportsSummaryComponent,
    UserPaymentReportsComponent,
    MpesaPaymentDetailsComponent
  ],
  providers:
  [DatePipe]
})
export class PaymentModule { }
