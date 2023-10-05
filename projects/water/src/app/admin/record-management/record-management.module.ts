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



@NgModule({
  declarations: [
    DashboardComponent,
    DateFilterDialogComponent,
    PlotResultsComponent,
    ConsumptionFilterDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(RecordManagementRoutes),
    ReactiveFormsModule,
    DemoMaterialModule,
    GraphsModule,
  ],
  providers : [DatePipe]

})
export class RecordManagementModule { }
