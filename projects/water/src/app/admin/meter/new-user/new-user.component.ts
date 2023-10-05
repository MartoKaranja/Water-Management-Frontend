import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { WaterService } from 'projects/water/src/app/services/water.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.css']
})
export class NewUserComponent {

  form: FormGroup;
  showSuccessMessage = false;
  response: any;

  constructor(
    private dialogRef: MatDialogRef<NewUserComponent>,
    private fb: FormBuilder,
    private server_conn : WaterService,
    private snackBar : MatSnackBar
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone_number : ['', Validators.required]
    });
  }

  createUser() {
    // Perform the necessary actions to create the Django user
    // You can use an API service or make an HTTP request here
    /*

    const formData = {
      "username": this.form.value.username,
      "email": this.form.value.email,
      "first_name": this.form.value.first_name,
      "last_name": this.form.value.last_name,
      "password": this.form.value.password,
      "profile": {
          "phone_number": this.form.value.phone_number
      }
        }

      */

    const formData = this.form.value;

    // Close the dialog and pass any necessary data back to the main component
    this.server_conn.createUserAccount(formData).subscribe({
      next: (response: any) => {
        // Handle the success response from the server
        // You can display a success message or perform any other necessary actions
        this.snackBar.open("User Ac created successfully!", 'Close', {
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
