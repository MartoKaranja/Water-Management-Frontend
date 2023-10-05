import { Component, Input } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { Consumption, MeterHistory} from 'projects/water/src/app/interfaces/questions.interface';
import { PlotlyService } from 'projects/water/src/app/services/plotly.service';
import { ConsumptionRecords } from 'projects/water/src/app/interfaces/questions.interface';

@Component({
  selector: 'app-consumption-graphs',
  templateUrl: './consumption-graphs.component.html',
  styleUrls: ['./consumption-graphs.component.css']
})
export class ConsumptionGraphsComponent {

  @Input() records !: Consumption[];
  chart_title :string = "Total consumption per user"


  constructor(private plot:PlotlyService) { }

  ngOnInit(): void {

    /*let groupedData = this.getGroupedData(this.records)

    this.plot.multiConsumptionPlotLine(this.chart_title,"line-plot",groupedData);*/
    let [x, y] = this.getCoords();
    this.plot.plotBar(this.chart_title,"line-plot",x, y);
  }

getCoords(): [string[], number[]]
  {
    interface UserConsumptions {
      [key: string]: number;
    }

    const userConsumptions: UserConsumptions = {};
    for (const rec of this.records) {
      const { user_name, consumption } = rec;
      userConsumptions[user_name] = (userConsumptions[user_name] || 0) + consumption;
    }

    const userNames = Object.keys(userConsumptions);
    const consumptionSums = Object.values(userConsumptions);

    return [userNames, consumptionSums]

  }





  ngOnChanges(changes: SimpleChanges) {
    if (changes['records']) {
      let [x, y] = this.getCoords();
      this.plot.plotBar(this.chart_title,"line-plot",x, y);
    }
  }


}
