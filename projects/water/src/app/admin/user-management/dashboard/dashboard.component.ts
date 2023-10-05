import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WaterService } from '../../../services/water.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  user_id !: number;

  constructor(private server_conn : WaterService, private route: ActivatedRoute) {}

  ngOnInit()
  {
    this.route.params.subscribe(params => {
      this.user_id = params['id'];
    });
  }

  public getWaterService(): WaterService {
    return this.server_conn;
  }




}
