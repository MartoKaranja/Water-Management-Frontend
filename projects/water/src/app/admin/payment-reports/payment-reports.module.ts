import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DemoMaterialModule } from '../../demo-material-module';
import { RouterModule } from '@angular/router';
import { PaymentRoutes } from './payment.routing';
import { DatePipe } from '@angular/common';
import { InvoiceComponent } from '../invoice-management/invoice-list/invoice.component';
import { GenerateInvoiceComponent } from '../invoice-management/generate-invoice/generate-invoice.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(PaymentRoutes),
    DemoMaterialModule,
    FormsModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule
  ],
  providers:
  [DatePipe]

})
export class PaymentReportsModule { }
