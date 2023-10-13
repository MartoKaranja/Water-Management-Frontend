import { Component, Input, SimpleChanges } from '@angular/core';
import { PlotlyService } from '../../../services/plotly.service';

@Component({
  selector: 'app-user-consumption-graphs',
  templateUrl: './user-consumption-graphs.component.html',
  styleUrls: ['./user-consumption-graphs.component.css']
})
export class UserConsumptionGraphsComponent {

  @Input() coordinates: any;
  chart_title = "User Consumption Breakdown"

  constructor(private plot : PlotlyService)
  {}

  ngOnInit() {
    this.plot.ConsumptionRecordsPlot(this.chart_title, "consumption-plot", this.coordinates.x, this.coordinates.y, this.coordinates.y1);
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['coordinates']) {
      this.plot.ConsumptionRecordsPlot(this.chart_title, "consumption-plot", this.coordinates.x, this.coordinates.y, this.coordinates.y1);
    }
  }


}
