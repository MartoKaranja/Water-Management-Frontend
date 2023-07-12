import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { WaterService } from 'projects/water/src/app/services/water.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-meter',
  templateUrl: './new-meter.component.html',
  styleUrls: ['./new-meter.component.css']
})
export class NewMeterComponent {

  meterForm: FormGroup;
  showSuccessMessage = false;
  response: any;

  constructor(
    private dialogRef: MatDialogRef<NewMeterComponent>,
    private fb: FormBuilder,
    private server_conn : WaterService,
    private snackBar : MatSnackBar
  ) {
    this.meterForm = this.fb.group({
      meter_name: ['', Validators.required],
      current_balance: ['', Validators.required],
      meter_reading: ['', Validators.required],
      valve_state: ['', Validators.required],
      imei: ['', Validators.required],
    });
  }

  createUser() {
    // Perform the necessary actions to create the Django user
    // You can use an API service or make an HTTP request here

    const formData = this.meterForm.value;

    // Close the dialog and pass any necessary data back to the main component
    this.server_conn.createMeterRecord(formData).subscribe({
      next: (response: any) => {
        // Handle the success response from the server
        // You can display a success message or perform any other necessary actions
        this.snackBar.open("Meter added successfully!", 'Close', {
          duration: 10000,
        });
        console.log(response)

        // Close the dialog and pass any necessary data back to the main component
        this.dialogRef.close(true);

      },
      error: (error: any) => {
        // Handle the error response from the server
        // You can display an error message or perform any other necessary actions
        console.log(error)
      }
    });


    //this.dialogRef.close(/* any data to pass back */);
  }

  cancel() {
    this.dialogRef.close();
  }

}
