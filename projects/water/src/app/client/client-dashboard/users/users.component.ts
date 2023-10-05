import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WaterService } from '../../../services/water.service';
import { UserRecords, Msg, UserRecordsList } from '../../../interfaces/questions.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  displayedColumns: string[] = ['username', 'current_balance', 'meter_reading', 'valve_state', 'landlord', 'edit_user_details'];
  progressBarMode = 'indeterminate';
  public record_tables !: UserRecordsList;
  public msg !: Msg;

  constructor(private waterService: WaterService) {}

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

}
