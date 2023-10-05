import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserRecords, MpesaResult } from '../../interfaces/questions.interface';
import { WaterService } from '../../services/water.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment-module',
  templateUrl: './payment-module.component.html',
  styleUrls: ['./payment-module.component.css']
})
export class PaymentModuleComponent {
  @Input() user_details !: UserRecords;
  mpesa_result !: MpesaResult;
  intervalId !: any;
  progress_message !: string;
  progressBarMode = 'determinate';
  show_check_transaction : boolean =  true;

  @Output() updateMeterDetails = new EventEmitter<void>();

  form = new FormGroup({
    amount: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    checkBox: new FormControl(false)
  });

  constructor(private snackBar : MatSnackBar, private server_conn : WaterService){}

  ngOnInit(){
    this.form.controls.phoneNumber.setValue(this.user_details.user_profile.phone_number)


  }

  onCheckboxChange(){
    if (this.form.get('phoneNumber')?.value === '') {
      this.form.get('phoneNumber')?.setValue(this.user_details.user_profile.phone_number);
    } else {
      this.form.get('phoneNumber')?.setValue('');
    }

  }

  onPhoneChange()
  {
    this.form.get('checkBox')?.setValue(true);
  }

  processPayment()
  {

    if (this.form.value.amount !== '')
    {
      const amount = Number(this.form.value.amount);

      if (isNaN(amount) || amount === 0) {
        console.log("Amount is not valid");
        return null;
      }

      this.progressBarMode = 'indeterminate';

      const formData = {
        'amount' : amount,
        'phone_number' : this.form.value.phoneNumber,
        'user_id' : this.user_details.user.id

      }

      this.server_conn.createNewPayment(formData).subscribe({
        next: (mpesa_result: MpesaResult) => {
          // Handle the success response from the server
          this.mpesa_result = mpesa_result
          console.log(this.mpesa_result)
          // You can display a success message or perform any other necessary actions
          if (mpesa_result.msg === undefined)
          {
            this.progress_message = this.mpesa_result.response.customerMessage;
            console.log("Progress message is " + this.progress_message)

            //show manual mpesa transaction check
            this.show_check_transaction = true;

            // Wait for the given amount of time
            this.intervalId = setInterval(() => {
              this.checkMpesaPayment();
            }, 10000);
          }
          else
          {
            this.progress_message = this.mpesa_result.msg ?? 'An error occured requesting user';
            this.progressBarMode = 'determinate';
          }
          this.snackBar.open(this.progress_message, 'Close', {
            duration: 10000,
          });
          console.log(mpesa_result)



        },
        error: (error: any) => {
          // Handle the error response from the server
          // You can display an error message or perform any other necessary actions
          console.log(error)
        }
      });

    }
  }

  /*------------------------------------------------------*/

  checkMpesaPayment()
  {

    let data = {
      'MerchantRequestID' : this.mpesa_result.response.merchantRequestID,
      'CheckoutRequestID' : this.mpesa_result.response.checkoutRequestID,
    }
    this.server_conn.checkMpesaPayment(data).subscribe ({
      next: (results : MpesaResult) => {
        this.mpesa_result = results

        //if results_Code break and cjheck
        console.log(typeof this.mpesa_result.response.resultCode);

        if (String(this.mpesa_result.response.resultCode) === '0')
        {
          clearInterval(this.intervalId);
          this.progress_message = "Mpesa Payment was successful"

          this.updateMeterDetails.emit()

          //hide the check mpesa transaction check
          //this.show_check_transaction = false;

          this.progressBarMode = 'determinate';
          //check status of token allocation
        }
        else if (String(this.mpesa_result.response.resultCode) === '17')
        {
          clearInterval(this.intervalId);
          this.progress_message = "Unable to process tranasaction as a similar transaction is in progress"

          //this.updateMeterDetails.emit()

          this.progressBarMode = 'determinate';

        }
        else if (String(this.mpesa_result.response.resultCode) === '1032')
        {
          clearInterval(this.intervalId);
          this.progress_message = "User has cancelled the request"

          //this.updateMeterDetails.emit()

          this.progressBarMode = 'determinate';

        }



      }
      ,
      error: (error: any) => {
        console.error(error);
      }

    });

  }

  checkMpesaTransaction(transaction_id : string)
  {
    let data = {
      'transaction_id' : transaction_id
    }
    this.server_conn.checkMpesaTransaction(data).subscribe ({
      next: (results : any) => {
        console.log(results)
      }
      ,
      error: (error: any) => {
        console.error(error);
      }

    });

  }
}
