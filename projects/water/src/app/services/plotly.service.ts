import { Injectable } from '@angular/core';
import { Consumption, MeterHistory } from '../interfaces/questions.interface';

declare let Plotly: any;

@Injectable({
  providedIn: 'root'
})
export class PlotlyService {

  constructor() { }

  plotLine(title: string, plotDiv: string, x:number[], y:number[]){
    let trace = {
      x: x,
      y: y,
      type: 'scatter'
    };

    let layout = {
      title:title,

    };

    Plotly.newPlot(plotDiv, [trace], layout, {responsive: true, scrollZoom: true});
  }

  plotBar(title: string, plotDiv: string, x:string[], y:number[]){
    let trace = {
      x: x,
      y: y,
      type: 'bar'
    };

    let layout = {
      title:title,
      xaxis: {
        title: 'Client User Name'
      },
      yaxis: {
        title: 'Consumption in Units'
      }

    };

    Plotly.newPlot(plotDiv, [trace], layout, {responsive: true, scrollZoom: true});
  }

  drawGroupedBar(records: Consumption[], plotDiv: string)
  {
    var data = [];
    var usernames : any = [];
    var readings : any= [];
    var consumptions : any = [];

    // Assuming the consumption objects are stored in an array called 'consumptionObjects'
    for (var i = 0; i < records.length; i++) {
      var obj = records[i];
      if (!usernames.includes(obj.user_name)) {
        usernames.push(obj.user_name);
        readings.push([]);
        consumptions.push([]);
      }
      var index = usernames.indexOf(obj.user_name);
      readings[index].push(obj.reading_time);
      consumptions[index].push(obj.consumption);
    }

    for (var i = 0; i < usernames.length; i++) {
      var trace = {
        x: readings[i],
        y: consumptions[i],
        name: usernames[i],
        type: 'bar'
      };
      data.push(trace);
    }

    var layout = {
      title: 'Consumption vs Reading Time',
      barmode: 'group',
      xaxis: {
        title: 'Reading Time'
      },
      yaxis: {
        title: 'Consumption'
      }
    };

    Plotly.newPlot(plotDiv, data, layout);

  }


  multiPlotLine(title: string, plotDiv: string, groupedRecords: {[key: string]: MeterHistory[]}){
    console.log(groupedRecords)
    let data = Object.keys(groupedRecords).map(meterName  => {
      let records = groupedRecords[meterName];
      return {
        x: records.map(record => record.reading_time),
        y: records.map(record => record.water_reading),
        mode: 'lines',
        name: meterName
      };
    });

    //console.log("data is" + data)

    let layout = {
      title:title,
    };

    Plotly.newPlot(plotDiv, data, layout, {responsive: true,scrollZoom: true});
  }

  multiConsumptionPlotLine(title: string, plotDiv: string, groupedRecords: {[key: string]: Consumption[]}){
    console.log(groupedRecords)
    let data = [
      {
        x: groupedRecords[Object.keys(groupedRecords)[0]].map(record => record.reading_time),
        y: groupedRecords[Object.keys(groupedRecords)[0]].map(record => record.consumption),
        type: 'bar',
        name: 'Consumption'
      },
      {
        x: groupedRecords[Object.keys(groupedRecords)[0]].map(record => record.reading_time),
        y: groupedRecords[Object.keys(groupedRecords)[0]].map(record => record.consumption),
        type: 'scatter',
        mode: 'lines',
        name: 'Consumption'
      },

      {
        x: groupedRecords[Object.keys(groupedRecords)[0]].map(record => record.reading_time),
        y: groupedRecords[Object.keys(groupedRecords)[0]].map(record => record.meter_reading),
        type: 'scatter',
        mode: 'lines',
        name: 'Reading',
        yaxis: 'y2',
        line: {
          color: 'blue'
        }
      }
    ];

    let layout = {
      title: title,
      xaxis: {
        title: 'Reading Time'
      },
      yaxis: {
        title: 'Units Consumed'
      },
      yaxis2: {
        title: 'Cumulative Meter Reading',
        overlaying: 'y',
        side: 'right'
      }
    };

    Plotly.newPlot(plotDiv, data, layout, {responsive: true,scrollZoom: true});
  }

  plotBarGraph(title: string, plotDiv: string, x1:number[], y1:number[], y2:number[])
  {
    var trace1 = {

      x: x1,

      y: y1,

      name: 'Water Reading',

      type: 'bar'

    };


    var trace2 = {

      x: x1,

      y: y2,

      name: 'Reading Time',

      type: 'bar'

    };


    var data = [trace1, trace2];


    var layout = {barmode: 'group'};

    // Create the plot
    Plotly.newPlot(plotDiv, [data], layout, {responsive: true, scrollZoom: true});
  }


ConsumptionRecordsPlot(title: string, plotDiv: string, x: any[], y:any[], y1: any[]){

  let data = [
    {
      x: x,
      y: y,
      type: 'bar',
      name: 'Consumption'
    },
    {
      x: x,
      y: y,
      type: 'scatter',
      mode: 'lines',
      name: 'Consumption'
    },

    {
      x: x,
      y: y1,
      type: 'scatter',
      mode: 'lines',
      name: 'Reading',
      yaxis: 'y2',
      line: {
        color: 'blue'
      }
    }
  ];

  let layout = {
    title: title,
    xaxis: {
      title: 'Reading Time'
    },
    yaxis: {
      title: 'Units Consumed'
    },
    yaxis2: {
      title: 'Cumulative Meter Reading',
      overlaying: 'y',
      side: 'right'
    }
  };

  Plotly.newPlot(plotDiv, data, layout, {responsive: true,scrollZoom: true});
}

}
