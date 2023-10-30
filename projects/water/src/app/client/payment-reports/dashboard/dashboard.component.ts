import { Component } from '@angular/core';
import { UsercredentialsService } from 'projects/water/src/app/services/usercredentials.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  user_name !: string;
  payment_id!: number;

  //Fetch from activated url
  //mpesa_details !: number;

  constructor(private auth : UsercredentialsService, private route : ActivatedRoute){}

  ngOnInit()
  {
    this.user_name = this.auth.username;
    this.payment_id = history.state["payment_id"]
    /*this.route.params.subscribe(params => {
      this.payment_id = params['payment_id'];
      // Now you can use the id
    });*/

    console.log("Payment id in dashboard from state" + this.payment_id)
    /*
    this.route.params.subscribe(params => {
      this.payment_id = params['payment_id'];
    });*/
    console.log(this.payment_id)

  }

  handlePaymentId(id : number)
  {
    this.payment_id = id;
  }


}
