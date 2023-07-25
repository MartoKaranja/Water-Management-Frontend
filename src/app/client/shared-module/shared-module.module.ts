import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ControlPanelComponent } from 'src/app/settings-components/control-panel/control-panel.component';
import { KeyControlPanelComponent } from 'src/app/settings-components/key-control-panel/key-control-panel.component';
import { DemoMaterialModule } from 'src/app/demo-material-module';
import { PromptDialogComponent } from 'src/app/settings-components/control-panel/prompt-dialog/prompt-dialog.component';
import { KeyPromptDialogComponent } from 'src/app/settings-components/key-control-panel/key-prompt-dialog/key-prompt-dialog.component';
import { ScheduleSummaryComponent } from '../schedule/schedule-summary/schedule-summary.component';
import { ArticlePromptComponent } from 'src/app/settings-component/article-prompt/article-prompt.component';
import { ArticlePromptDialogComponent } from 'src/app/settings-component/article-prompt/article-prompt-dialog/article-prompt-dialog.component';



@NgModule({
  declarations: [
    ControlPanelComponent,
    KeyControlPanelComponent,
    PromptDialogComponent,
    KeyPromptDialogComponent,
    ScheduleSummaryComponent,
    ArticlePromptComponent,
    ArticlePromptDialogComponent
  ],
  imports: [
    CommonModule,
    DemoMaterialModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ControlPanelComponent,
    KeyControlPanelComponent,
    PromptDialogComponent,
    KeyPromptDialogComponent,
    ScheduleSummaryComponent,
    ArticlePromptComponent,
    ArticlePromptDialogComponent
  ]
})
export class SharedModuleModule { }
