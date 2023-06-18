import { Component, Input } from '@angular/core';
import { WaterService } from 'projects/water/src/app/services/water.service';
import { MeterRecord, Msg } from 'projects/water/src/app/interfaces/questions.interface';

@Component({
  selector: 'app-meter-records',
  templateUrl: './meter-records.component.html',
  styleUrls: ['./meter-records.component.css']
})
export class MeterRecordsComponent {

  @Input() waterService !: WaterService;
  public meter_records !: MeterRecord;
  meterProgress = 'indeterminate'
  public msg !: Msg;

  ngOnInit() {
    this.fetchMeterSummary();

  }

  fetchMeterSummary()
  {
    this.waterService.getMetersSummary().subscribe({
      next: (database_results: MeterRecord) => {
        console.log(database_results)
        this.meter_records= database_results
        this.meterProgress = 'determinate';

      },
      error: (error: any) => {
        console.error(error);
      }
    });

  }

}
