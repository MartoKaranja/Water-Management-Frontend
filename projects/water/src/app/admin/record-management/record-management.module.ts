import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { RecordManagementRoutes } from './record-management.routing';
import { DateFilterDialogComponent } from './dashboard/date-filter-dialog/date-filter-dialog.component';
import { PlotResultsComponent } from './dashboard/plot-results/plot-results.component';
import { GraphsModule } from '../graphs/graphs.module';
import { ConsumptionFilterDialogComponent } from './dashboard/consumption-filter-dialog/consumption-filter-dialog.component';
import { CurrentMonthSummaryComponent } from './current-month-summary/current-month-summary.component';
import { MonthlyViewComponent } from './monthly-view/monthly-view.component';
import { AnnualViewComponent } from './annual-view/annual-view.component';
import { UserConsumptionSummaryComponent } from './user-consumption-summary/user-consumption-summary.component';
import { InvoiceModule } from '../../shared_modules/invoice/invoice.module';




@NgModule({
  declarations: [
    DashboardComponent,
    DateFilterDialogComponent,
    PlotResultsComponent,
    ConsumptionFilterDialogComponent,
    CurrentMonthSummaryComponent,
    MonthlyViewComponent,
    AnnualViewComponent,
    UserConsumptionSummaryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(RecordManagementRoutes),
    ReactiveFormsModule,
    DemoMaterialModule,
    GraphsModule,
    InvoiceModule,
  ],
  providers : [DatePipe]

})
export class RecordManagementModule { }
