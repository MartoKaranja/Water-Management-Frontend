import { Component } from '@angular/core';
import { WaterService } from '../../../services/water.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  constructor( private server_conn : WaterService)
  {}

  public getWaterService(): WaterService {
    return this.server_conn;
  }

}
