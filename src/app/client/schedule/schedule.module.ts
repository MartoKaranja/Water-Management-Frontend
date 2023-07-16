import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from 'src/app/demo-material-module';
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
    ReactiveFormsModule,
    DemoMaterialModule
  ]
})
export class ScheduleModule { }
