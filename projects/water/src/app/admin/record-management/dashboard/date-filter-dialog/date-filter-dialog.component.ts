import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-date-filter-dialog',
  templateUrl: './date-filter-dialog.component.html',
  styleUrls: ['./date-filter-dialog.component.css']
})
export class DateFilterDialogComponent {

  dateForm : FormGroup;
  results : any;
  users !: any[];
  meters !: any [];

  constructor(
    public dialogRef: MatDialogRef<DateFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ){
    this.users = data.users;
    this.meters = data.meters;
    this.dateForm = this.fb.group({
        start_date: [''],
        end_date: [''],
        users: [''],
        meters: [''],
      });
    }

  ngOnInit()
  {

  }

  onConfirm(): void {
    // Close the dialog and return the form data
    console.log(this.dateForm.value)
    this.dialogRef.close(this.dateForm.value);
  }

  onCancel(): void {
    // Close the dialog without returning any data
    this.dialogRef.close();
  }

}
