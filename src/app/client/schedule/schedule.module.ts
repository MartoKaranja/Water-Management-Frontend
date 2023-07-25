import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { ScheduleRoutes } from './schedule.routing';
import { ScheduleQuestionsComponent } from './schedule-questions/schedule-questions.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';



@NgModule({
  declarations: [
    ScheduleQuestionsComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ScheduleRoutes),
    FormsModule,
    ReactiveFormsModule,
    DemoMaterialModule,
    SharedModuleModule
  ]
})
export class ScheduleModule { }
