import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ConsumptionReportRoutes } from './consumption-reports.routing';
import { PaymentModule } from '../../admin/payment/payment.module';
import { GraphsModule } from '../../admin/graphs/graphs.module';
import { SharedModule } from 'projects/water/src/app/client/shared/shared.module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ConsumptionReportRoutes),
    PaymentModule,
    GraphsModule,
    SharedModule
  ]
})
export class ConsumptionReportsModule { }
