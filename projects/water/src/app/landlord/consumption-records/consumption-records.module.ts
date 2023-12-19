import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordsSummaryComponent } from './records-summary/records-summary.component';
import { DemoMaterialModule } from '../../demo-material-module';
import { RecordsSummaryPlotComponent } from './records-summary-plot/records-summary-plot.component';



@NgModule({
  declarations: [
    RecordsSummaryComponent,
    RecordsSummaryPlotComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule
  ],
  exports:
  [
    RecordsSummaryComponent,
    RecordsSummaryPlotComponent
  ]
})
export class ConsumptionRecordsModule { }
