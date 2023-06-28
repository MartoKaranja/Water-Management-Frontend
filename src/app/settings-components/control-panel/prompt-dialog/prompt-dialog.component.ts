import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressBar } from '@angular/material/progress-bar';


@Component({
  selector: 'app-prompt-dialog',
  templateUrl: './prompt-dialog.component.html',
  styleUrls: ['./prompt-dialog.component.css']
})
export class PromptDialogComponent {

  @ViewChild('progressBar', { static: true }) progressBar!: MatProgressBar;
  error: Boolean = false

  constructor(
    public dialogRef: MatDialogRef<PromptDialogComponent>,
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
    this.data.service.updatePrompt(this.data.prompt).subscribe({
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
