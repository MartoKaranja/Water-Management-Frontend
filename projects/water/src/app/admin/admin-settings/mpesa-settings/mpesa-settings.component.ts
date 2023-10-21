import { Component, Input } from '@angular/core';
import { WaterService } from '../../../services/water.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-mpesa-settings',
  templateUrl: './mpesa-settings.component.html',
  styleUrls: ['./mpesa-settings.component.css']
})
export class MpesaSettingsComponent {
  @Input() user_id !: number;
  form !: FormGroup;
  showSuccessMessage = false;
  response: any;
  detail_id !: number;

  constructor(
    private fb: FormBuilder,
    private snackBar : MatSnackBar,
    private route: ActivatedRoute,
    private server_conn : WaterService
  ) { }

  ngOnInit(){

    this.fetchMpesaAPIDetails();

  }


  fetchMpesaAPIDetails()
  {
    this.server_conn.fetchMpesaAPIDetails().subscribe({
      next: (response: any) => {
        this.detail_id = response.id
        this.form = this.fb.group({
          shortcode: [response.shortcode, Validators.required],
          tillno: [response.tillno, [Validators.required]],
          passkey: [response.passkey, [Validators.required]],
          consumer_key: [response.consumer_key, Validators.required],
          consumer_secret: [response.consumer_secret, Validators.required],
          account_no : [response.account_no, Validators.required]
        });
      },
      error: (error: any) =>
      {
        console.log(error)
      }
    });


  }

  updateMpesaDetails() {
    // Perform the necessary actions to create the Django user
    // You can use an API service or make an HTTP request here

    const formData = this.form.value;

    // Close the dialog and pass any necessary data back to the main component
    this.server_conn.updateMpesaDetails(this.detail_id, formData).subscribe({
        next: (response: any) => {
            // Handle the success response from the server
            // You can display a success message or perform any other necessary actions
            this.snackBar.open("Mpesa details updated successfully!", 'Close', {
                duration: 10000,
            });
            this.fetchMpesaAPIDetails();
        },
        error: (error: any) => {
            // Handle the error response from the server
            // You can display an error message or perform any other necessary actions
            console.log(error)
        }
    });
}

saveMpesaDetails() {
  // Perform the necessary actions to create the Django user
  // You can use an API service or make an HTTP request here
  if (this.form.valid) {
    const formData = this.form.value;
    this.server_conn.createMpesaDetails(formData).subscribe({
      next: (response: any) => {
          // Handle the success response from the server
          // You can display a success message or perform any other necessary actions
          this.snackBar.open("Mpesa details saved successfully!", 'Close', {
              duration: 10000,
          });
          this.fetchMpesaAPIDetails();
      },
      error: (error: any) => {
          // Handle the error response from the server
          // You can display an error message or perform any other necessary actions
          console.log(error)
      }
  });
  }
  else
  {
    console.log("Form needs to be filled")
  }
}


}
