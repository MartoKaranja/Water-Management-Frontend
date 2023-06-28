import { Component, Inject, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatProgressBar } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-key-prompt-dialog',
  templateUrl: './key-prompt-dialog.component.html',
  styleUrls: ['./key-prompt-dialog.component.css']
})
export class KeyPromptDialogComponent {

  @ViewChild('progressBar', { static: true }) progressBar!: MatProgressBar;
  error: Boolean = false

  constructor(
    public dialogRef: MatDialogRef<KeyPromptDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  updateApiKey():void {
    this.error = false;
    this.progressBar.mode = "indeterminate"

    //save to backend
    this.data.service.updateApiKey(this.data.key).subscribe({
      next:(response:any) => {
        console.log(response);
        this.progressBar.mode = 'determinate';
        this.progressBar.value = 100;
        this.snackBar.open("API Key was updated successfully", 'Close', {
          duration: 10000,
        });
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
