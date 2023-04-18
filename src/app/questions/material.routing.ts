import { Routes } from '@angular/router';

import {  AllQuestionsComponent } from '../all-questions/all-questions.component';
import { QuestionDetailsComponent } from '../question-details/question-details.component';


export const QuestionRoutes: Routes = [
  {
    path: '',
    component: AllQuestionsComponent
  },
  {
    path: 'question-details/:id',
    component: QuestionDetailsComponent
  }
];
