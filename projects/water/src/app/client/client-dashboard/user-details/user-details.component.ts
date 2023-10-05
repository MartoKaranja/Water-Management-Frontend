import { Input, Component, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WaterService } from '../../../services/water.service';
import { UserRecords, Msg, UserRecordsList } from '../../../interfaces/questions.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent {
  @Input() user_name !: string;
  @Output() user_details = new EventEmitter<UserRecordsList>();

  displayedColumns: string[] = ['username', 'current_balance', 'meter_reading', 'valve_state', 'landlord', 'edit_user_details'];
  progressBarMode = 'indeterminate';
  public record_tables !: UserRecordsList;
  public msg !: Msg;

  constructor( private waterService: WaterService) {}

  ngOnInit() {

      this.fetchSingleUserRecords()

  }


  fetchSingleUserRecords()
  {

    this.waterService.fetchSingleUser(this.user_name).subscribe({
      next: (database_results: UserRecordsList) => {
        console.log(database_results);
        this.record_tables = database_results;
        this.progressBarMode = 'determinate';

        //call other components
        this.sendData()

      },
      error: (error: any) => {
        console.error(error);
      }
    });

  }

  updateRecords()
  {
    this.waterService.updateSingleUser(this.user_name).subscribe({
      next: (msg: Msg) => {
        console.log(msg)
        this.msg = msg
        this.progressBarMode = 'determinate';

        this.fetchSingleUserRecords()

      },
      error: (error: any) => {
        console.error(error);
      }
    });
  }

  sendData() {
    console.log("Calling parent component" + this.record_tables.results[0])
    this.user_details.emit(this.record_tables);
  }

}
