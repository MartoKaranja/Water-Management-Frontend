import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WaterService } from '../../../services/water.service';
import { UserRecords, Msg } from '../../../interfaces/questions.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  userName !: string;

  progressBarMode = 'indeterminate';

  public record_tables !: UserRecords;
  public msg !: Msg;

  constructor(private route: ActivatedRoute, private waterService: WaterService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userName = params['user_name'];
    });

    if (this.userName)
    {
      this.fetchSingleUserRecords()

    }
    else
    {
      this.fetchUserRecords();
    }


  }


  fetchSingleUserRecords()
  {

    this.waterService.fetchSingleUser(this.userName).subscribe({
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
    this.waterService.updateSingleUser(this.userName).subscribe({
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

}
