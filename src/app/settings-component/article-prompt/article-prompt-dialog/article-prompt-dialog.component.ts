import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-article-prompt-dialog',
  templateUrl: './article-prompt-dialog.component.html',
  styleUrls: ['./article-prompt-dialog.component.css']
})
export class ArticlePromptDialogComponent {
  @ViewChild('progressBar', { static: true }) progressBar!: MatProgressBar;
  error: Boolean = false

  constructor(
    public dialogRef: MatDialogRef<ArticlePromptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updatePrompt():void {
    this.error = false;
    this.progressBar.mode = "indeterminate"
    console.log(this.data.prompt)
    //save to backend
    this.data.service.updateArticlePrompt(this.data.prompt).subscribe({
      next:(response:any) => {
        console.log(response);
        this.progressBar.mode = 'determinate';
        this.progressBar.value = 100;
        this.dialogRef.close();
    },
    error: (error: any) => {
      this.progressBar.mode = 'determinate';
      this.progressBar.value = 30;
      this.error = true
      console.error(error);
    },
    complete: () => {

      // This code will run regardless of whether the subscribe function succeeded or failed
    }
    });
  }

}
