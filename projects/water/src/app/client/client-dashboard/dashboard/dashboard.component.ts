import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WaterService } from '../../../services/water.service';
import { UserRecords, Msg, UserRecordsList } from '../../../interfaces/questions.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  userName : string = '';
  displayedColumns: string[] = ['username', 'current_balance', 'meter_reading', 'valve_state', 'landlord', 'edit_user_details'];
  progressBarMode = 'indeterminate';
  public record_tables !: UserRecordsList;
  public msg !: Msg;
  coordinates !: any;

  user_info !: UserRecords;

  constructor(private route: ActivatedRoute, private waterService: WaterService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userName = params['user_name'];
    });
  }



  public getWaterService(): WaterService {
    return this.waterService;
  }

  public receiveData(data: UserRecordsList) {
    //console.log("Receiving call from parent" + data )
    this.record_tables = data;
  }

  fetchSingleUserRecords()
  {
    //to be implemented ...moved from child component or link to it
  }

  receiveCoordinatesData(data: any) {
    console.log("Receiving call from parent" + data )
    this.coordinates = data;
  }

}
