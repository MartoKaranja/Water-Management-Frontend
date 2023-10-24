import { Component } from '@angular/core';
import { UserRecordsList } from '../../../interfaces/questions.interface';
import { WaterService } from '../../../services/water.service';
import { UsercredentialsService } from 'projects/water_sys/src/app/services/usercredentials.service';
import { PaymentModuleComponent } from '../../shared/payment-module/payment-module.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  public record_tables !: UserRecordsList;
  public user_name !: string;

  constructor( private waterService: WaterService, private auth_service: UsercredentialsService) {}

  ngOnInit() {

      this.fetchSingleUserRecords()
      this.user_name = this.auth_service.username

  }

  fetchSingleUserRecords()
  {

    this.waterService.fetchSingleUser(this.user_name).subscribe({
      next: (database_results: UserRecordsList) => {
        console.log(database_results);
        this.record_tables = database_results;
        //this.progressBarMode = 'determinate';

        //call other components
        //this.sendData()

      },
      error: (error: any) => {
        console.error(error);
      }
    });

  }

}
