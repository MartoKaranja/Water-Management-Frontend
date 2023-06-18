import { Component } from '@angular/core';
import { WaterService } from '../../../services/water.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private waterService : WaterService, private snackBar: MatSnackBar, private fb: FormBuilder)
  {}


  ngOnInit() {
    this.fetchAddUserFormDetails();

    this.form = this.fb.group({
      users: [this.users],
      meters: [this.meters],
      landlords: [this.landlords]
    });

  }


  fetchAddUserFormDetails() {
    this.waterService.fetchAddUsersForm().subscribe({
      next: (database_results: any) => {
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

  submitForm() {
    if (this.form.valid) {
      // Handle form submission
      console.log(this.form.value);
    }
  }

}
