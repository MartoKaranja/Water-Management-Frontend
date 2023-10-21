import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { DemoMaterialModule } from '../../demo-material-module';
import { PaymentReportsSummaryComponent } from './payment-reports-summary/payment-reports-summary.component';
import { UserPaymentReportsSummaryComponent } from './user-payment-reports-summary/user-payment-reports-summary.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FilterPaymentReportsComponent } from './filter-payment-reports/filter-payment-reports.component';



@NgModule({
  declarations: [
    PaymentReportsSummaryComponent,
    UserPaymentReportsSummaryComponent,
    DashboardComponent,
    FilterPaymentReportsComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule
  ],
  exports: [
    PaymentReportsSummaryComponent,
    UserPaymentReportsSummaryComponent
  ],
  providers:
  [DatePipe]
})
export class PaymentModule { }
