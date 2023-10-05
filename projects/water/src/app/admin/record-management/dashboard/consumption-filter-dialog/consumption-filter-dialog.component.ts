import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-consumption-filter-dialog',
  templateUrl: './consumption-filter-dialog.component.html',
  styleUrls: ['./consumption-filter-dialog.component.css']
})
export class ConsumptionFilterDialogComponent {

  dateForm : FormGroup;
  results : any;
  users !: any[];

  constructor(
    public dialogRef: MatDialogRef<ConsumptionFilterDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
  ){
    this.users = data.users;
    this.dateForm = this.fb.group({
        start_date: [''],
        end_date: [''],
        users: [''],
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
