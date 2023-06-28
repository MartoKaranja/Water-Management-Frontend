import { Component, Input } from '@angular/core';
import { WaterService } from '../../../../services/water.service';
import { UserRecords, Msg} from '../../../../interfaces/questions.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-records',
  templateUrl: './user-records.component.html',
  styleUrls: ['./user-records.component.css']
})
export class UserRecordsComponent {

  @Input() waterService !: WaterService;
  progressBarMode = 'indeterminate';



  public record_tables !: UserRecords;
  public msg !: Msg;


  constructor(private snackBar: MatSnackBar)
  {}


  ngOnInit() {
    this.fetchUserRecords();
  }

  fetchUserRecords() {
    this.waterService.fetchActiveUsers().subscribe({
      next: (database_results: UserRecords) => {
        console.log(database_results)
        this.record_tables = database_results
        this.progressBarMode = 'determinate';

      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }


  updateRecords()
  {
    this.waterService.updateMeterReadings().subscribe({
      next: (database_results: UserRecords) => {
        console.log(database_results)
        this.record_tables = database_results
        this.progressBarMode = 'determinate';

      },
      error: (error: any) => {
        console.error(error);
      }
    });

  }




}
