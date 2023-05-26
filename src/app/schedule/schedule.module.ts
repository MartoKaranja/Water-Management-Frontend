import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DemoMaterialModule } from '../demo-material-module';
import { ScheduleRoutes } from './schedule.routing';
import { ScheduleQuestionsComponent } from './schedule-questions/schedule-questions.component';
import { ScheduleSummaryComponent } from './schedule-summary/schedule-summary.component';



@NgModule({
  declarations: [
    ScheduleQuestionsComponent,
    ScheduleSummaryComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ScheduleRoutes),
    FormsModule,
    DemoMaterialModule
  ]
})
export class ScheduleModule { }
