import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { AllQuestionsComponent } from '../all-questions/all-questions.component';
import { QuestionRoutes } from './material.routing';
import { MatTableModule } from '@angular/material/table';
import { QuestionDetailsComponent } from '../question-details/question-details.component';
import { FormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { GeneratedAnswersComponent } from '../all-questions/generated-answers/generated-answers.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { DatabaseQuestionsComponent } from './database-questions/database-questions.component';
import { GeneratedAnswersHistoryComponent } from '../all-questions/generated-answers-history/generated-answers-history.component';
import { QuestionDbDetailsComponent } from '../all-questions/question-db-details/question-db-details.component';
import { GeneratedArticlesHistoryComponent } from '../all-questions/generated-articles-history/generated-articles-history.component';



@NgModule({
  declarations: [
    AllQuestionsComponent,
    QuestionDetailsComponent,
    GeneratedAnswersComponent,
    DatabaseQuestionsComponent,
    GeneratedAnswersHistoryComponent,
    QuestionDbDetailsComponent,
    GeneratedArticlesHistoryComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    RouterModule.forChild(QuestionRoutes),
    DemoMaterialModule,
    FormsModule,
    MatTableExporterModule,
    SharedModuleModule
  ]
})
export class QuestionsModule { }
