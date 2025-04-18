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
import { DatabaseQuestionsComponent } from './database-questions/database-questions.component';
import { GeneratedAnswersHistoryComponent } from '../all-questions/generated-answers-history/generated-answers-history.component';
import { QuestionDbDetailsComponent } from '../all-questions/question-db-details/question-db-details.component';



@NgModule({
  declarations: [
    AllQuestionsComponent,
    QuestionDetailsComponent,
    ControlPanelComponent,
    PromptDialogComponent,
    GeneratedAnswersComponent,
    DatabaseQuestionsComponent,
    GeneratedAnswersHistoryComponent,
    QuestionDbDetailsComponent,
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
