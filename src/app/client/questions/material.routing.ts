import { Routes } from '@angular/router';

import {  AllQuestionsComponent } from '../all-questions/all-questions.component';
import { QuestionDetailsComponent } from '../question-details/question-details.component';
import { GeneratedAnswersComponent } from '../all-questions/generated-answers/generated-answers.component';
import { DatabaseQuestionsComponent } from './database-questions/database-questions.component';
import { GeneratedAnswersHistoryComponent } from '../all-questions/generated-answers-history/generated-answers-history.component';
import { GeneratedArticlesHistoryComponent } from '../all-questions/generated-articles-history/generated-articles-history.component';
import { QuestionDbDetailsComponent } from '../all-questions/question-db-details/question-db-details.component';


export const QuestionRoutes: Routes = [
  {
    path: '',
    component: AllQuestionsComponent
  },
  {
    path: 'question-details/:id',
    component: QuestionDetailsComponent
  },
  {
    path: 'question-db-details/:id/:table_name',
    component: QuestionDbDetailsComponent
  },
  {
    path: 'generated-answers',
    component: GeneratedAnswersComponent
  },
  {
    path:'database-questions/:db',
    component: DatabaseQuestionsComponent
  },
  {
    path: 'generated-answers-history/:id',
    component: GeneratedAnswersHistoryComponent
  },
  {
    path: 'generated-content-history/:id',
    component: GeneratedArticlesHistoryComponent
  },
];
