import { Component } from '@angular/core';
import { UsercredentialsService } from 'projects/water/src/app/services/usercredentials.service';
import { WaterService } from '../../../services/water.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  user_name !: string;
  coordinates !: any;

  constructor( private auth_service: UsercredentialsService, private waterService: WaterService) {}

  ngOnInit() {

    this.user_name = this.auth_service.username

  }

  public getWaterService(): WaterService {
    return this.waterService;
  }

  receiveCoordinatesData(data: any) {
    console.log("Receiving call from parent" + data )
    this.coordinates = data;
  }




}
