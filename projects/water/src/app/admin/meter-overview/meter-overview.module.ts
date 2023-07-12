import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MeterDashboardComponent } from './meter-dashboard/meter-dashboard.component';
import { MeterOverviewRoutes } from './meter-overview.routing';
import { EditMeterRecordComponent } from '../meter/edit-meter-record/edit-meter-record.component';



@NgModule({
  declarations: [
    MeterDashboardComponent,
    EditMeterRecordComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    RouterModule.forChild(MeterOverviewRoutes),
    ReactiveFormsModule
  ]
})
export class MeterOverviewModule { }
