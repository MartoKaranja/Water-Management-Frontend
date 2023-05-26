import { Routes } from '@angular/router';

import {  AllQuestionsComponent } from '../all-questions/all-questions.component';
import { QuestionDetailsComponent } from '../question-details/question-details.component';
import { GeneratedAnswersComponent } from '../all-questions/generated-answers/generated-answers.component';


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
    path: 'generated-answers',
    component: GeneratedAnswersComponent
  }
];
