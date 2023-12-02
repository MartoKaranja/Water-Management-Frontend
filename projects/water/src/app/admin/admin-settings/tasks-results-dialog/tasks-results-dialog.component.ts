import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TaskTransaction, RechargeProgressResults, MeterQueryResults } from '../../../interfaces/questions.interface';
import { WaterService } from '../../../services/water.service';

@Component({
  selector: 'app-tasks-results-dialog',
  templateUrl: './tasks-results-dialog.component.html',
  styleUrls: ['./tasks-results-dialog.component.css']
})
export class TasksResultsDialogComponent {
  progressBarMode="indeterminate"
  recharge_data !: any;
  status_data !: any;


  constructor(public dialogRef: MatDialogRef<TasksResultsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: TaskTransaction, private water_conn:WaterService){ }

  ngOnInit()
  {
    console.log(this.data);
    if (this.data.transaction_type === "Meter Status")
    {
      this.fetchMeterQueryStatus()
    }
    else if (this.data.transaction_type === "Payment Recharge"){
      this.fetchTokenRechargeProgress()
    }
    else if (this.data.transaction_type === "Valve Operation"){
      this.valveOperationProgress()
    }


  }

  fetchMeterQueryStatus()
  {
    this.water_conn.checkMeterQueryStatus({'value_id':this.data.value_id}).subscribe({
      next:(results : MeterQueryResults) => {
        this.status_data = results
        this.progressBarMode = 'determinate';
      },
      error: (error: any) => {
        console.error(error);

      }
      });

  }

  fetchTokenRechargeProgress()
  {
    this.progressBarMode = 'indeterminate'
    this.water_conn.rechargeMeterProgress({'order_id':this.data.value_id}).subscribe({
      next:(results : RechargeProgressResults) => {
        this.recharge_data = results
        this.progressBarMode = 'determinate';
      },
      error: (error: any) => {
        console.error(error);

      }
      });

  }

  valveOperationProgress()
  {

    this.progressBarMode = 'indeterminate'
    this.water_conn.switchValveProgress({'value_id':this.data.value_id}).subscribe({
      next:(results : RechargeProgressResults) => {
        this.recharge_data = results
        this.progressBarMode = 'determinate';
      },
      error: (error: any) => {
        console.error(error);

      }
      });

  }

  onConfirm(): void {
    // Close the dialog and return the form data
    //console.log(this.dateForm.value)
    if (this.recharge_data !== undefined) {
        return this.dialogRef.close(this.recharge_data);
    } else if (this.status_data !== undefined) {
        return this.dialogRef.close(this.status_data);
    } else {
      this.dialogRef.close();
    }
  }

  onCancel(): void {
    // Close the dialog without returning any data
    this.dialogRef.close();
  }

}
