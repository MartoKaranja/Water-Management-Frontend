import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { PaymentRoutes } from './payment.routing';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PaymentRoutes),
  ],
  providers:
  [DatePipe]

})
export class PaymentReportsModule { }
