import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DemoMaterialModule } from '../../demo-material-module';
import { InvoiceDashboardComponent } from './invoice-dashboard/invoice-dashboard.component';
import { GenerateInvoiceComponent } from './generate-invoice/generate-invoice.component';
import { InvoiceComponent } from './invoice-list/invoice.component';
import { InvoiceManagementRoutes } from './invoice-management.routing';



@NgModule({
  declarations: [
    InvoiceDashboardComponent,
    GenerateInvoiceComponent,
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(InvoiceManagementRoutes),
    DemoMaterialModule,
    FormsModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule
  ]
})
export class InvoiceManagementModule { }
