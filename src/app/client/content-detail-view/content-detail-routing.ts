import { Routes } from '@angular/router';

import { AnswerViewComponent } from './answer-view/answer-view.component';
import { ArticleViewComponent } from './article-view/article-view.component';


export const ContentDetailViewRoutes: Routes = [
  {
    path: 'view-answer/:id',
    component: AnswerViewComponent
  },
  {
    path: 'view-article/:id',
    component: ArticleViewComponent
  }
];
