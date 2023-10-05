import { Component, Input } from '@angular/core';
import { SimpleChanges } from '@angular/core';
import { MeterHistory} from 'projects/water/src/app/interfaces/questions.interface';
import { PlotlyService } from 'projects/water/src/app/services/plotly.service';

@Component({
  selector: 'app-plot-results',
  templateUrl: './plot-results.component.html',
  styleUrls: ['./plot-results.component.css']
})
export class PlotResultsComponent {
  @Input() water_records !: MeterHistory[];
  constructor(private plot:PlotlyService) { }

  ngOnInit(): void {

    console.log(this.water_records)

    /*let {x, y} = this.getXY(this.water_records);

    this.plot.plotLine("Line Plot","line-plot",x,y);*/

    let groupedData = this.getGroupedData(this.water_records)

    this.plot.multiPlotLine("Line Plot","line-plot",groupedData);

    let {x1, y1,y2} = this.getBarCords(this.water_records);

    this.plot.plotBar("Consumption Records", "bar-plot", y2,y1);
  }

  getBarCords(water_records: MeterHistory[]): {x1: any[], y1: any[], y2:any[]}
  {
    let x1 = water_records.map(record => record.meter_name);
    let y1 = water_records.map(record => record.water_reading);
    let y2 = water_records.map(record => record.reading_time);

    return {x1, y1, y2};

  }

  getGroupedData(water_records: MeterHistory[]): {[key: string]: MeterHistory[]} {
    let groupedRecords = water_records.reduce((groups: {[key: string]: MeterHistory[]}, record) => {
      let key = record.meter_name;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(record);
      return groups;
    }, {});

    return groupedRecords;
  }

  getXY(water_records: MeterHistory[]): {x: any[], y: any[]} {
    let y = water_records.map(record => record.water_reading);
    let x = water_records.map(record => record.reading_time);
    return {x, y};
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['water_records']) {

      /*let {x, y} = this.getXY(this.water_records);
      this.plot.plotLine("Line Plot","line-plot",x,y);
      */
      let groupedData = this.getGroupedData(this.water_records)
      this.plot.multiPlotLine("Line Plot","line-plot",groupedData);

      let {x1, y1,y2} = this.getBarCords(this.water_records);
      //this.plot.plotBarGraph("Consumption Records", "bar-plot", x1, y1,y2)
      this.plot.plotBar("Consumption Records", "bar-plot", y2,y1);
    }
  }


}
