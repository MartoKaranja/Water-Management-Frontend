import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../../demo-material-module';
import { ContentDetailViewRoutes } from './content-detail-routing';
import { AnswerViewComponent } from './answer-view/answer-view.component';
import { ArticleViewComponent } from './article-view/article-view.component';



@NgModule({
  declarations: [
    AnswerViewComponent,
    ArticleViewComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(ContentDetailViewRoutes),
    DemoMaterialModule
  ]
})
export class ContentDetailViewModule { }
