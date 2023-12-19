import { Component } from '@angular/core';
import { WaterService } from '../../../services/water.service';

@Component({
  selector: 'app-widgets',
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.css']
})
export class WidgetsComponent {
  results !: any;

  constructor(private waterService : WaterService){}

  ngOnInit() {
    this.fetchWidgetData();

  }

  fetchWidgetData()
  {
    this.waterService.fetchWidgetData().subscribe({
      next: (results: any) => {
        console.log("daily average " + results.monthly_consumption)
        console.log("monthly consumption " + results.average_consumption)
        console.log("Total revenue" + results.total_payment)

        this.results = results;


      },
      error: (error: any) => {
        console.error(error);
      }
    });

  }

}
