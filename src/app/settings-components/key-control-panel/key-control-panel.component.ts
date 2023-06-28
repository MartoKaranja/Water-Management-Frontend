import { Component, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { KeyPromptDialogComponent } from './key-prompt-dialog/key-prompt-dialog.component';
import { QuestionService } from 'src/app/services/questions.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-key-control-panel',
  templateUrl: './key-control-panel.component.html',
  styleUrls: ['./key-control-panel.component.css']
})
export class KeyControlPanelComponent {

  @Input() dataService !: QuestionService;
  key:string = '';

  constructor(public dialog: MatDialog) {

  }

  async update_key() {
    try {
      const response = this.dataService.fetchApiKey();
      let prompt_response: any = await lastValueFrom(response);

      this.key = prompt_response.key;

      console.log("prompt" + this.key);

      const dialogRef = this.dialog.open(KeyPromptDialogComponent, {
        data: { key: this.key, service: this.dataService }
      });

      const result = await dialogRef.afterClosed().toPromise();

      console.log('The dialog was closed');
      console.error(result);
    } catch (error) {
      console.error(error);
    }
  }

}
