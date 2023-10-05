import { Component, ViewChild } from '@angular/core';
import { WaterService } from '../../../services/water.service';
import { WaterRecords, Msg, Consumption } from '../../../interfaces/questions.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsumptionRecordsComponent } from '../consumption-records/consumption-records.component';

@Component({
  selector: 'app-water-dashboard',
  templateUrl: './water-dashboard.component.html',
  styleUrls: ['./water-dashboard.component.css']
})
export class WaterDashboardComponent {

  progressBarMode = 'determinate';
  meter_data !: Consumption[];
  @ViewChild(ConsumptionRecordsComponent) childComponent!: ConsumptionRecordsComponent;

  public msg !: Msg;
  public record_tables !: WaterRecords;



  constructor(private waterService : WaterService, private snackBar: MatSnackBar)
  {}

  ngOnInit() {

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

        //this.fetchWaterRecords();

      },
      error: (error: any) => {
        console.error(error);
      }
    });

  }



  public getWaterService(): WaterService {
    return this.waterService;
  }

  receiveData(data: Consumption[]) {
    console.log("Receiving call from parent" + data )
    this.meter_data = data;
  }

  fetchConsumptionRecords(){
    console.log("Calling child component")
    this.childComponent.getConsumptionRecords()

  }

}
