import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  received_landlord_id: number | null = null;


  fetchLandlordClients(user_id : number)
  {
    this.received_landlord_id = user_id;

  }

}
