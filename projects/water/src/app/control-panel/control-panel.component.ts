import { Component, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PromptDialogComponent } from './prompt-dialog/prompt-dialog.component';
import { QuestionService } from '../services/questions.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.css']
})
export class ControlPanelComponent {
  @Input() dataService !: QuestionService;
  prompt:string = '';

  constructor(public dialog: MatDialog) {

   }

  async view_edit_prompt() {
    try {
      const response = this.dataService.getPrompt();
      let prompt_response: any = await lastValueFrom(response);

      this.prompt = prompt_response.prompt;

      console.log("prompt" + this.prompt);

      const dialogRef = this.dialog.open(PromptDialogComponent, {
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


};

