import { Component } from '@angular/core';
import { Consumption } from '../../../interfaces/questions.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  meter_data !: Consumption[]

  receiveData(data: Consumption[]) {
    console.log("Receiving call from parent" + data )
    this.meter_data = data;
  }


}
