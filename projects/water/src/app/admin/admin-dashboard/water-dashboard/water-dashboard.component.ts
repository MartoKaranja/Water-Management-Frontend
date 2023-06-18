import { Component } from '@angular/core';
import { WaterService } from '../../../services/water.service';
import { WaterRecords, Msg } from '../../../interfaces/questions.interface';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-water-dashboard',
  templateUrl: './water-dashboard.component.html',
  styleUrls: ['./water-dashboard.component.css']
})
export class WaterDashboardComponent {

  progressBarMode = 'indeterminate';


  public msg !: Msg;
  public record_tables !: WaterRecords;



  constructor(private waterService : WaterService, private snackBar: MatSnackBar)
  {}

  ngOnInit() {
    this.fetchWaterRecords();
  }

  fetchWaterRecords() {
    this.waterService.getWaterRecordsSummary().subscribe({
      next: (database_results: WaterRecords) => {
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
    this.waterService.updateRecords().subscribe({
      next: (results: Msg) => {
        console.log(results)
        this.msg = results
        this.progressBarMode = 'determinate';

        this.snackBar.open(this.msg.errMsg, 'Close', {
          duration: 10000,
        });

        this.fetchWaterRecords();

      },
      error: (error: any) => {
        console.error(error);
      }
    });

  }



  public getWaterService(): WaterService {
    return this.waterService;
  }

}
