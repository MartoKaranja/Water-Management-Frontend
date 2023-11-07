import { Component, OnInit, Inject, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DateRange } from '@angular/material/datepicker';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-filter-payment-details-dialog',
  templateUrl: './filter-payment-details-dialog.component.html',
  styleUrls: ['./filter-payment-details-dialog.component.css'],
  providers:[DatePipe]
})
export class FilterPaymentDetailsDialogComponent {
  //dateForm : FormGroup;
  results : any;
  users !: any[];

  start_date !: any;
  end_date !: any;
  @Input() selectedRangeValue: DateRange<Date> | undefined;
  selected !: Date | null;

  constructor(private datePipe : DatePipe, public dialogRef: MatDialogRef<FilterPaymentDetailsDialogComponent>){ }

  ngOnInit()
  {

  }

  selectedChange(m: any) {
    if (!this.selectedRangeValue?.start || this.selectedRangeValue?.end) {
      this.selectedRangeValue = new DateRange<Date>(m, null);
    } else {
      const start = this.selectedRangeValue.start;
      const end = m;
      if (end < start) {
        this.selectedRangeValue = new DateRange<Date>(end, start);
      } else {
        this.selectedRangeValue = new DateRange<Date>(start, end);
      }
    }
    this.start_date = this.datePipe.transform(this.selectedRangeValue.start, 'yyyy-MM-dd');
    this.end_date = this.datePipe.transform(this.selectedRangeValue.end, 'yyyy-MM-dd');
  }

  onConfirm(): void {
    // Close the dialog and return the form data
    //console.log(this.dateForm.value)
    this.dialogRef.close({'start_date':this.start_date, 'end_date': this.end_date});
  }

  onCancel(): void {
    // Close the dialog without returning any data
    this.dialogRef.close();
  }

}
