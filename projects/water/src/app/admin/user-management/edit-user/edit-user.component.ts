import { Component, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { WaterService } from '../../../services/water.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  @Input() user_id !: number;
  @Input() server_conn !: WaterService;
  form !: FormGroup;
  showSuccessMessage = false;
  response: any;

  constructor(
    private fb: FormBuilder,
    private snackBar : MatSnackBar,
    private route: ActivatedRoute
  ) { }

  ngOnInit(){

    if (this.user_id !== undefined)
    {
      this.fetchUserDetails();
    }
    else
    {
      this.form = this.fb.group({
        username: ['', Validators.required],
        password: [''],
        email: ['', [Validators.required, Validators.email]],
        first_name: ['', Validators.required],
        last_name: ['', Validators.required],
        phone_number : ['', Validators.required]
      });
    }


  }


  fetchUserDetails()
  {
    this.server_conn.fetchUserDetails(this.user_id).subscribe({
      next: (response: any) => {
        this.form = this.fb.group({
          email: [response.email, [Validators.required, Validators.email]],
          password: [''],
          first_name: [response.first_name, Validators.required],
          last_name: [response.last_name, Validators.required],
          phone_number : [response.phone_number, Validators.required]
        });
      },
      error: (error: any) =>
      {
        console.log(error)
      }
    });


  }

  updateUser() {
    // Perform the necessary actions to create the Django user
    // You can use an API service or make an HTTP request here

    const formData = this.form.value;
    const updatedFormData: { [key: string]: any } = {};

    Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
            updatedFormData[key] = value;
        }
    });

    // Close the dialog and pass any necessary data back to the main component
    this.server_conn.updateUserAccount(this.user_id, updatedFormData).subscribe({
        next: (response: any) => {
            // Handle the success response from the server
            // You can display a success message or perform any other necessary actions
            this.snackBar.open("User Ac updated successfully!", 'Close', {
                duration: 10000,
            });
            this.fetchUserDetails();
        },
        error: (error: any) => {
            // Handle the error response from the server
            // You can display an error message or perform any other necessary actions
            console.log(error)
        }
    });
}


}
