import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../demo-material-module';
import { AllQuestionsComponent } from '../all-questions/all-questions.component';
import { QuestionRoutes } from './material.routing';
import { MatTableModule } from '@angular/material/table';
import { QuestionDetailsComponent } from '../question-details/question-details.component';
import { FormsModule } from '@angular/forms';
import { ControlPanelComponent } from '../control-panel/control-panel.component';
import { PromptDialogComponent } from '../control-panel/prompt-dialog/prompt-dialog.component';
import { GeneratedAnswersComponent } from '../all-questions/generated-answers/generated-answers.component';
import { MatTableExporterModule } from 'mat-table-exporter';



@NgModule({
  declarations: [
    AllQuestionsComponent,
    QuestionDetailsComponent,
    ControlPanelComponent,
    PromptDialogComponent,
    GeneratedAnswersComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule.forChild(QuestionRoutes),
    DemoMaterialModule,
    FormsModule,
    MatTableExporterModule,
  ]
})
export class QuestionsModule { }
