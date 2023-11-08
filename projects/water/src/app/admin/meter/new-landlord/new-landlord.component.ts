import { Component, Inject } from '@angular/core';
import { WaterService } from 'projects/water/src/app/services/water.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-new-landlord',
  templateUrl: './new-landlord.component.html',
  styleUrls: ['./new-landlord.component.css']
})
export class NewLandlordComponent {

  form: FormGroup;
  showSuccessMessage = false;
  response: any;
  users : any[];

  constructor(
    private dialogRef: MatDialogRef<NewLandlordComponent>,
    private fb: FormBuilder,
    private server_conn: WaterService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.users = data.users;
    this.form = this.fb.group({
      landlord_name: ['', Validators.required],
      user_id: [this.users],
    });
  }

  ngOnInit(): void {
  }

  createUser() {
    const formData = this.form.value;

    // Close the dialog and pass any necessary data back to the main component
    this.server_conn.createLandlordAccount(formData).subscribe({
      next: (response: any) => {
        // Handle the success response from the server
        // You can display a success message or perform any other necessary actions
        this.snackBar.open("Landlord Ac created successfully!", 'Close', {
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

  }

  cancel() {
    this.dialogRef.close();
  }

}
