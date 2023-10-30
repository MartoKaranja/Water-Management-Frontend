import { Component, Input, SimpleChanges } from '@angular/core';
import { MpesaPaymentDetails } from '../../../interfaces/questions.interface';
import { WaterService } from '../../../services/water.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-mpesa-payment-details',
  templateUrl: './mpesa-payment-details.component.html',
  styleUrls: ['./mpesa-payment-details.component.css']
})
export class MpesaPaymentDetailsComponent {
  data!: MpesaPaymentDetails;
  @Input() payment_id!: string;
  progressBarMode = 'determinate';

  constructor(private sever_conn: WaterService, private route: ActivatedRoute)
  {}

  ngOnInit()
  {
    console.log(this.payment_id)
    this.get_mpesa_details();
  }

  get_mpesa_details()
  {
    let str: number = Number(this.payment_id)
    this.sever_conn.get_mpesa_payment_details(str).subscribe({
      next: (database_results: MpesaPaymentDetails) => {
        console.log("meters summary" + database_results)

        this.data= database_results;

        this.progressBarMode = 'determinate';
      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.payment_id) {
      console.log('payment_id changed:', changes.payment_id.currentValue);
      this.get_mpesa_details();
      // Perform your action here
    }
  }

}
