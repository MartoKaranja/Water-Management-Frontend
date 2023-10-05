import { Component } from '@angular/core';
import { WaterService } from '../../../services/water.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NewUserComponent } from '../../meter/new-user/new-user.component';
import { NewLandlordComponent } from '../../meter/new-landlord/new-landlord.component';
import { NewMeterComponent } from '../../meter/new-meter/new-meter.component';
import { FormDetails } from '../../../interfaces/questions.interface';


@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {

  record_tables !: any
  progressBarMode = 'indeterminate';

  form !: FormGroup;
  users !: any[]; // Populate with the list of users
  meters !: any[]; // Populate with the list of meters
  landlords !: any[]; // Populate with the list of landlords

  constructor(private waterService : WaterService, private snackBar: MatSnackBar, private fb: FormBuilder, private dialog : MatDialog)
  {}


  ngOnInit() {
    this.fetchAddUserFormDetails();

    this.form = this.fb.group({
      user: [this.users],
      meter: [this.meters],
      landlord: [this.landlords]
    });

  }


  fetchAddUserFormDetails() {
    this.waterService.fetchAddUsersForm().subscribe({
      next: (database_results: FormDetails) => {
        console.log(database_results)
        this.users = database_results.users;
        this.meters = database_results.meters;
        this.landlords = database_results.landlords;
        this.progressBarMode = 'determinate';

      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }


  openCreateUserDialog() {
    const dialogRef = this.dialog.open(NewUserComponent, {
      width: '37%', // Set the desired width here
      data: { /* Optional data to pass to the dialog component */ }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true )
      {
        this.fetchAddUserFormDetails()
      }
      // Handle any actions after the dialog is closed
      // For example, you can refresh the list of existing users
    });
  }


  openCreateLandlordDialog() {
    const dialogRef = this.dialog.open(NewLandlordComponent, {
      width: '37%', // Set the desired width here
      data: { users: this.users  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true )
      {
        this.fetchAddUserFormDetails()
      }
      // Handle any actions after the dialog is closed
      // For example, you can refresh the list of existing users
    });
  }


  openCreateMeterDialog() {
    const dialogRef = this.dialog.open(NewMeterComponent, {
      width: '37%', // Set the desired width here
      data: { users: this.users  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result == true )
      {
        this.fetchAddUserFormDetails()
      }
      // Handle any actions after the dialog is closed
      // For example, you can refresh the list of existing users
    });
  }

  submitForm() {
    if (this.form.valid) {
      // Handle form submission
      console.log(this.form.value);
      const formData = this.form.value;

      // Close the dialog and pass any necessary data back to the main component
      this.waterService.createUserRecords(formData).subscribe({
        next: (response: any) => {
          this.snackBar.open("User Record created successfully!", 'Close', {
            duration: 10000,
          });
          console.log(response)
        },
        error: (error: any) => {
          console.log(error)
        }
      });
      }
    }

}
