import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ArticlePromptDialogComponent } from './article-prompt-dialog/article-prompt-dialog.component';
import { QuestionService } from 'src/app/services/questions.service';
import { lastValueFrom } from 'rxjs';


@Component({
  selector: 'app-article-prompt',
  templateUrl: './article-prompt.component.html',
  styleUrls: ['./article-prompt.component.css']
})
export class ArticlePromptComponent {
  @Input() dataService !: QuestionService;
  prompt:string = '';

  constructor(public dialog: MatDialog) {

   }

  async view_edit_prompt() {
    try {
      const response = this.dataService.getArticlePrompt();
      let prompt_response: any = await lastValueFrom(response);

      this.prompt = prompt_response.prompt;

      console.log("prompt" + this.prompt);

      const dialogRef = this.dialog.open(ArticlePromptDialogComponent, {
        width: '45%',
        data: { prompt: this.prompt, service: this.dataService }
      });

      const result = await dialogRef.afterClosed().toPromise();

      console.log('The dialog was closed');
      console.error(result);
    } catch (error) {
      console.error(error);
    }
  }

}
