import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WaterService } from '../../../../services/water.service';
import { UserRecords, Msg, UserRecordsList} from '../../../../interfaces/questions.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-records',
  templateUrl: './user-records.component.html',
  styleUrls: ['./user-records.component.css']
})
export class UserRecordsComponent {

  @Input() waterService !: WaterService;
  @Output() results_fetched = new EventEmitter();
  progressBarMode = 'indeterminate';



  public record_tables !: UserRecordsList;
  public msg !: Msg;


  constructor(private snackBar: MatSnackBar)
  {}


  ngOnInit() {
    this.fetchUserRecords();
  }

  fetchUserRecords() {
    this.waterService.fetchActiveUsers().subscribe({
      next: (database_results: UserRecordsList) => {
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
    this.progressBarMode = 'indeterminate';
    this.waterService.updateMeterReadings().subscribe({
      next: (results: Msg) => {
          console.log(results)
          this.msg = results
          this.progressBarMode = 'determinate';

          this.results_fetched.emit()

          this.snackBar.open(this.msg.errMsg, 'Close', {
            duration: 10000,
          });



        },
        error: (error: any) => {
          console.error(error);
          this.progressBarMode = 'determinate';
          this.snackBar.open("An error has occured. Unable to fetch results.", 'Close', {
            duration: 10000,
          });
        }
    });

  }




}
